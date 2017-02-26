const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.Promise = global.Promise; // silence DeprecationWarning

const db = mongoose.connect(config.db);

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
                if (err) { console.error(err); }
                cb(err, user);
            });
        } else {
            cb(null, user);
        }
    });
};

exports.getUserInfo = function(id, cb) {
    User.findOne({
        _id: id
    }, (err, user) => {
        cb(err, user);
    });
};

exports.deleteUser = function(id, cb) {
    User.findOneAndRemove({
        _id: id
    }, (err, user) => {
        if (err) { console.error(err); }
        cb(err, user);
    });
};
