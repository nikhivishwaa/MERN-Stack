const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { hash, genSalt, compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const fetchuser = require('../middleware/fetchuser');

const router = express.Router();

router.use(express.json());
const jwt_secret = process.env.JWT_SECRET;


// ROUTE - 1 : create user using POST - /api/auth/createuser
// applying validators for user data validation
router.post('/createuser', [
    body("name", "Invalid name").isLength({ min: 3 }),
    body("email", "Invalid email").isEmail({ min: 3 }),
    body("password", "Password must be atleast of 8 characters").isLength({ min: 8 })
], async (req, res) => {
    const error = validationResult(req);
    try {
        if (!error.isEmpty()) {
            return res.status(400).json({ "error": error.array() });
        }
        const isexist = await User.findOne({ email: req.body.email })
        if (isexist) {
            return res.status(400).json({ "error": 'user already exist' });
        }
        const salt = await genSalt(10);
        const secPswd = await hash(req.body.password, salt);
        let rawUser = { name: req.body.name, email: req.body.email, password: secPswd }
        let user = await User.create(rawUser);
        const data = {
            user: { id: user.id }
        }
        const authtoken = jwt.sign(data, jwt_secret);
        res.status(201).json({ authtoken })
    }
    catch (e) {
        res.status(500).send("Internal server error")
    }
})


// ROUTE - 2 : authenticate a user using POST - /api/auth/login

router.post('/login', [
    body("email", "Invalid email").isEmail(),
    body("password", "Password not be empty").exists()
], async (req, res) => {
    const error = validationResult(req);
    try {
        if (!error.isEmpty()) {
            return res.status(400).json({ "error": error.array() });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ "error": 'invalid credentials' });
        }
        const pswdMatch = await compare(password, user.password);
        if (!pswdMatch) {
            return res.status(400).json({ "error": 'invalid credentials' });
        }
        const data = {
            user: { id: user.id }
        }
        const authtoken = jwt.sign(data, jwt_secret);
        res.json({ authtoken })
    } catch (e) {
        res.status(500).send("Internal server error");
    }
})

// ROUTE - 3 : getuserdetail of authenticated user using POST - /api/auth/user

router.post('/user', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const data = await User.findById(userId).select('-password');
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).send("Internal server error")
    }
})

module.exports = router;
