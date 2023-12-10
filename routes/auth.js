const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require("express-validator")

// Create a User using POST method on "/api/auth"
router.post("/", [
    body('name', "Name must be atleast 3 characters long").isLength({ min: 3 }),
    body('email', "Enter a valid Email address").isEmail(),
    body('password', "Password must be atleast 6 characters long.").isLength({ min: 6 }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(user => res.json(user))
    .catch(err => {console.log(err)
    res.json({error: "This Email address is already registered", message: err.message})})
})

module.exports = router;