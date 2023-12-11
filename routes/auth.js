const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require("express-validator")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET_SIGN;
const fetchUser = require("../middleware/fetchUserData")

// ROUTE ENDPOINT NO: 1
// Create a User using POST method on "/api/auth/createuser" (NO login required)
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
        console.log(err.message)
        // Send status "500" if anything went wrong
        res.status(500).send("Something went wrong :( (Internal Server Error)")
    }
})

// ROUTE ENDPOINT NO: 2
// Authenticate a User using POST method on "/api/auth/login" (login required)
router.post("/login", [
    // Validating fields for creating a user
    body('email', "Enter a valid Email address").isEmail(),
    body('password', "Password cannot be blank.").exists(),
], async (req, res) => {
    // Return errors and status "400" (If any)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // Sent "email" & "password" to request body
    const { email, password } = req.body;
    // Authenticate user by "email" & "password"
    try {
        // Find the user by it's email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Email or Password incoorect. Please login with correct credentials." });
        }
        // Compare the passwords; the one which is entered and the one which is saved in DB
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Email or Password incoorect. Please login with correct credentials." });
        }
        // Send the payload data to that user
        const payload = {
            user: {
                id: user.id
            }
        }
        // Same Authentication token from above & give it secret key/signature
        const JWT_AuthToken = jwt.sign(payload, JWT_SECRET);
        // Send that Authentication Token
        res.json({ JWT_AuthToken })

    } catch (err) {
        console.log(err.message)
        // Send status "500" if anything went wrong
        res.status(500).send("Something went wrong :( (Internal Server Error)")
    }
})

// ROUTE ENDPOINT NO: 3
// Get loggedin User details using POST method on "/api/auth/getuser" (login required)
router.post("/getuser", fetchUser, async (req, res) => {
    try {
        var userId = req.user.id;
        // Find the user by it's ID (sent prev) and unselect the "password" from it & send the response.
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (err) {
        console.log(err.message)
        // Send status "500" if anything went wrong
        res.status(500).send("Something went wrong :( (Internal Server Error)")
    }
})

module.exports = router;

// What is the use of JWT Authentication ?
// To authenticate the JSON data of user, authorized by server. When the authorization is granted, the server returns an authorization token to that application which is used to access data.