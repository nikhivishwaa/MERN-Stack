const express = require('express');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const router = express.Router();

router.use(express.json());


// ROUTE - 1 : get all notes of authenticated user using POST - /api/notes/all

router.get('/all', fetchuser, async (req, res) => {
    try {
        const data = await Note.find({ user: req.user.id }).select("-user");
        res.json(data);
    }
    catch (e) {
        res.status(500).send("Internal server error")
    }
})


// ROUTE - 2 : create a note of authenticated user using POST - /api/notes/new

router.post('/new', fetchuser, [
    body("title", "title cannot be blank").isLength({ min: 3 }),
    body("description", "description cannot be blank").isLength({ min: 3 }),
], async (req, res) => {
    const error = validationResult(req);
    try {
        if (!error.isEmpty()) {
            return res.status(400).json({ "error": error.array() });
        }
        const user = req.user.id;
        const { title, description, tag } = req.body;
        const data = await Note.create({ user, title, description, tag });
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).send("Internal server error")
    }
})


// ROUTE - 3 : update a note of authenticated user using DELETE - /api/notes/change/:id

router.put('/change/:id', fetchuser, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send("Not Found");

        // checking given note id belongs to user or not
        if (req.user.id !== note.user.toString()) {
            return res.status(401).send("Not Allowed");
        }
        const { title, description, tag } = req.body;
        const updateValues = {};
        if (title) updateValues.title = title;
        if (description) updateValues.description = description;
        if (tag) updateValues.tag = tag;

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { $set: updateValues }, { new: true }).select("-user");
        res.json({ success: "note has been updated", note: updatedNote });
    } catch (e) {
        res.status(500).send("Internal server error");
    }
})


// ROUTE - 4 : delete a note of authenticated user using DELETE - /api/notes/remove/:id

router.delete('/remove/:id', fetchuser, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        // checking given note id belongs to user or not
        if (req.user.id !== note.user.toString()) {
            return res.status(401).send("Not Allowed");
        }

        const deletedNote = await Note.findByIdAndDelete(req.params.id).select("-user");
        res.json({ success: "note has been deleted", note: deletedNote });
    }
    catch (e) {
        res.status(500).send("Internal server error")
    }
})

module.exports = router;
