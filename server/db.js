const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const mongoose = require("mongoose");

const db = mongoose.connect(config.db);
const dbTest = mongoose.connection;
dbTest.on("error", console.error.bind(console, "MongoDB connection error"));
dbTest.once("open", () => console.log("Connection success"));

const UserSchema = new mongoose.Schema({
    twitterId: String
});

const MemeSchema = new mongoose.Schema({
    userId: Number,
    imageURL: String,
    text: String,
    likes: Number,
    shares: Number
});

const User = mongoose.model("User", UserSchema);
const Meme = mongoose.model("Meme", MemeSchema);

exports.userLogin = function(twitterId, cb) {
    User.findOrCreate({twitterId: twitterId}, (err, user) => {
        cb(err, user);
    });
};
