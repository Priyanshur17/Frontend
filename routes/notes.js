const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchUser = require("../middleware/fetchUserData")
const { body, validationResult } = require("express-validator")

// ROUTE ENDPOINT NO: 1
// Get all Notes using GET method on "/api/notes/createuser" (Login required)
router.get("/fetchnotes", fetchUser, async (req, res) => {
    try {
        // Find all the notes with a user id
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (err) {
        console.log(err.message)
        // Send status "500" (Internal Server Error) if anything went wrong
        res.status(500).send("Something went wrong :( (Internal Server Error)")
    }
})

// ROUTE ENDPOINT NO: 2
// Add new Notes using POST method on "/api/notes/addnote" (Login required)
router.post("/addnote", fetchUser, [
    // Validating fields for creating a new note
    body('title', "Title must be atleast 3 characters long").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 characters long").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Return errors and status "400" (If any)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        // Put all the fields of notes in request user id as an object
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        // Save the note and send the response
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (err) {
        console.log(err.message)
        // Send status "500" (Internal Server Error) if anything went wrong
        res.status(500).send("Something went wrong :( (Internal Server Error)")
    }
})

module.exports = router;