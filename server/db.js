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
    userId: String,
    imageURL: String,
    text: String,
    likes: Number,
    shares: Number
});

const User = mongoose.model("User", UserSchema);
const Meme = mongoose.model("Meme", MemeSchema);
exports.User = User;

/*
 * USER
 */

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
                username: profile.username
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

/*
 * MEME
 */

 exports.newMeme = function(userId, memeInfo, cb) {
     Meme.create({
         userId: userId,
         imageURL: memeInfo.imageURL,
         text: memeInfo.text,
         likes: 0,
         shares: 0
     }, (err, newMeme) => {
         if (err) { console.error(err); }
         cb(err, newMeme);
     });
 };

 exports.editMeme = function(userId, memeId, updates, cb) {
    Meme.findById(memeId, (err, meme) => {
        if (err) {
            console.error(err);
            cb(err);
        } else if (!meme) {
            cb(new Error("No meme found"));
        } else if (userId != meme.userId) {
            cb(new Error("Unauthorized"));
        } else {
            for (let key in updates) {
                meme[key] = updates[key];
            }
            meme.save((err) => {
                if (err) { console.error(err); }
                cb(err, meme);
            });
        }
    });
 };

 exports.deleteMeme = function(userId, memeId, cb) {
     Meme.findById({
         _id: memeId
     }, (err, meme) => {
         if (err) {
             console.error(err);
             cb(err);
         } else if (userId != meme.userId) {
             cb(new Error("Unauthorized"));
         } else {
             meme.remove((err) => {
                 if (err) { console.error(err); }
                 cb(err, meme);
             })
         }
     });
 };

 exports.getUserMemes = function(userId, cb) {
    Meme.find({
        userId: userId
    }, (err, memes) => {
        if (err) { console.error(err); }
        cb(err, memes);
    })
 };

 exports.getAllMemes = function(options, cb) {
     Meme.find()
     .skip(options.offset || 0)
     .limit(options.limit || 100)
     .exec((err, memes) => {
         cb(err, memes);
     });
 };
