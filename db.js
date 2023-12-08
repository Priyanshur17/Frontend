const mongoose = require('mongoose')
require('dotenv').config();

const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@inotebookdb.lul0odf.mongodb.net/`

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
    }).then(() => {
        console.log("Connection is successfull :)");
    }).catch((e) => {
        console.log("NOT Connection :( => " + e);
    });
}

module.exports = connectToMongo;