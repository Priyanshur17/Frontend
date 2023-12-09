const connectToMongo = require('./db');
const express = require("express")

connectToMongo();
const app = express();
const port = 8000;

app.get("/", (req, res) => res.status(200).send("Hello Me Here"))

// Availabe Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
