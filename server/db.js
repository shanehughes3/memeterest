const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const db = mongoose.connect(config.db);
const dbTest = mongoose.connection;
dbTest.on("error", console.error.bind(console, "MongoDB connection error"));
dbTest.once("open", () => console.log("Connection success"));

const UserSchema = new mongoose.Schema({});
UserSchema.plugin(passportLocalMongoose);
UserSchema.add({
    twitterId: String,
    twitterUsername: String
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
exports.User = User;

exports.userLogin = function(profile, cb) {
    User.findOne({
        twitterId: profile.id,
    }, (err, user) => {
        if (err) {
            console.error(err);
            cb(err);
        } else if (!user) {
            user = new User({
                twitterId: profile.id,
                twitterUsername: profile.username
            });
            user.save((err) => {
                if (err) {
                    console.error(err);
                }
                cb(err, user);
            });
        } else {
            cb(null, user);
        }
    });
};
