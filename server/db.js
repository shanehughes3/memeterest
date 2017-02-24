const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const mongoose = require("mongoose");

const db = mongoose.connect(config.db);
const dbTest = mongoose.connection;
dbTest.on("error", console.error.bind(console, "MongoDB connection error"));
dbTest.once("open", () => console.log("Connection success"));

exports.userLogin = function(twitterId, cb) {
    User.findOrCreate({twitterId: twitterId}, (err, user) => {

    });
};
