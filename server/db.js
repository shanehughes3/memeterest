const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const db = mongoose.connect(config.db);
const dbTest = mongoose.connection;
dbTest.on("error", console.error.bind(console, "MongoDB connection error"));
dbTest.once("open", () => console.log("Connection success"));

const UserSchema = new mongoose.Schema({});
UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);
UserSchema.add({ twitterId: String });

const MemeSchema = new mongoose.Schema({
    userId: Number,
    imageURL: String,
    text: String,
    likes: Number,
    shares: Number
});

const User = mongoose.model("User", UserSchema);
const Meme = mongoose.model("Meme", MemeSchema);
exports.User = User;

exports.userLogin = function(twitterId, cb) {
    User.findOrCreate({twitterId: twitterId}, (err, user) => {
        cb(err, user);
    });
};
