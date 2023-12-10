const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require("express-validator")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "mak";

// Create a User using POST method on "/api/auth/createuser". NO login 
router.post("/createuser", [
    // Validating fields for creating a user
    body('name', "Name must be atleast 3 characters long").isLength({ min: 3 }),
    body('email', "Enter a valid Email address").isEmail(),
    body('password', "Password must be atleast 6 characters long.").isLength({ min: 6 }),
], async (req, res) => {
    // Return errors and status "400" (If any)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // Validate the user with same email exists
    try {
        let user = await User.findOne({ email: req.body.email });
        // If user already exsists with same email, send status "400" & error message
        if (user) {
            return res.status(400).json({ error: "This Email address is already registered with a user" })
        }
        // Adding salt & hashing in user password
        const salt = await bcrypt.genSalt(10);
        const secretPassword = await bcrypt.hash(req.body.password, salt);
        // Create a new error
        user = await User.create({
            name: req.body.name,
            password: secretPassword,
            email: req.body.email
        });
        // Create a "data" object using user id 
        const data = {
            user: {
                id: user.id
            }
        }
        // Create a Authentication token from that data & give it secret key/signature
        const JWT_AuthToken = jwt.sign(data, JWT_SECRET);
        // Send that Authentication Token
        res.json({ JWT_AuthToken })
    } catch (err) {
        console.err(err.message)
        // Send status "500" if anything went wrong
        res.status(500).send("Something went wrong :(")
    }
})

module.exports = router;

// What is the use of JWT Authentication ?
// To authenticate the JSON data of user, authorized by server. When the authorization is granted, the server returns an authorization token to that application which is used to access data.