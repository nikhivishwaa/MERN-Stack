+const jwt = require('jsonwebtoken');
require('dotenv').config()

const jwt_secret = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    // get user from jwt token provided in header
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send("please provide valid auth token");
    }
    try {
        const data = jwt.verify(token, jwt_secret);
        req.user = data.user;
        next();
    }
    catch (e) {
        return res.status(401).send("please provide valid auth token");
    }

}

module.exports = fetchuser;
