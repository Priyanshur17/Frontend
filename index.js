const connectToMongo = require('./db');
const express = require("express")

connectToMongo();
const app = express();
const port = 8000;

app.get("/", (req, res) => res.status(200).send("Hello Me Here"))

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
