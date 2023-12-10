const connectToMongo = require('./db');
const express = require("express")

connectToMongo();
const app = express();
const port = 8000;      // Active port number

app.use(express.json());

// Home page status and message
app.get("/", (req, res) => res.status(200).send("Hello Me Here"))

// Availabe Routes from file
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Console message for running port
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
