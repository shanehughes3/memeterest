const db = require("../server/db.js");
const chai = require("chai");
chai.use(require("chai-things"));
const should = chai.should();

describe("API", function() {
    let userId;
    let userId2;

    describe("User", function() {

        it("should save new user", function(done) {
            db.userLogin({
                id: "123456789",
                username: "test_user"
            }, (err, user) => {
                if (err) { done(err); }
                else {
                    should.exist(user);
                    user.should.have.property("_id");
                    userId = user._id;
                    done();
                }
            })
        });

        it("should save another user", function(done) {
            db.userLogin({
                id: "987654321",
                username: "other_test"
            }, (err, user) => {
                if (err) { done(err); }
                else {
                    should.exist(user);
                    user.should.have.property("_id");
                    userId2 = user._id;
                    done();
                }
            })
        });

        it("should get user info", function(done) {
            db.getUserInfo(userId, (err, user) => {
                if (err) { done(err); }
                else {
                    should.exist(user);
                    user.should.have.property("username", "test_user");
                    done();
                }
            });
        });
    });

    describe("Meme", function() {
        let memeId;
        let memeId2;

        it("should save new meme", function(done) {
            db.newMeme(userId, {
                imageURL: "http://www.test.com",
                text: "A dank test meme"
            }, (err, newMeme) => {
                if (err) { done(err); }
                else {
                    should.exist(newMeme);
                    newMeme.should.have.property("_id");
                    memeId = newMeme._id.toString();
                    done();
                }
            });
        });

        it("should save another meme", function(done) {
            db.newMeme(userId2, {
                imageURL: "http://www.test.com",
                text: "The other test meme"
            }, (err, newMeme) => {
                if (err) { done(err); }
                else {
                    should.exist(newMeme);
                    newMeme.should.have.property("_id");
                    memeId2 = newMeme._id.toString();
                    done();
                }
            })
        })

        it("should retrieve user memes", function(done) {
            db.getUserMemes(userId, (err, memes) => {
                if (err) { done(err); }
                else {
                    should.exist(memes);
                    memes.should.be.an("array");
                    memes.should.have.length.of.at.least(1);
                    // this is not ideal - would like to test on _id against memeID,
                    // but chai-things doesn't seem to support such a thing right now
                    memes.should.contain.a.thing.with.property("text", "A dank test meme");
                    done();
                }
            });
        });

        it("should retrieve all memes", function(done) {
            db.getAllMemes({ limit: 15 }, (err, memes) => {
                if (err) { done(err); }
                memes.should.be.an("Array");
                memes.should.have.length.of.at.least(2);
                done();
            });
        })

        it("should edit user meme", function(done) {
            db.editMeme(userId, memeId, {
                text: "New test meme text"
            }, (err, editedMeme) => {
                if (err) { done(err); }
                else {
                    should.exist(editedMeme);
                    editedMeme.should.have.property("_id");
                    editedMeme._id.toString().should.equal(memeId);
                    editedMeme.should.have.property("text", "New test meme text");
                    done();
                }
            });
        });

        it("should delete user meme", function(done) {
            db.deleteMeme(userId, memeId, (err, deletedMeme) => {
                if (err) { done(err); }
                else {
                    should.exist(deletedMeme);
                    deletedMeme.should.have.property("_id");
                    deletedMeme._id.toString().should.equal(memeId);
                    done();
                }
            });
        });

        it("should delete the other user meme", function(done) {
            db.deleteMeme(userId2, memeId2, (err, deletedMeme) => {
                if (err) { done(err); }
                else {
                    should.exist(deletedMeme);
                    deletedMeme.should.have.property("_id");
                    deletedMeme._id.toString().should.equal(memeId2);
                    done();
                }
            })
        })
    });

    describe("User (cleanup)", function() {

        it("should delete user", function(done) {
            db.deleteUser(userId, (err, user) => {
                if (err) { done(err); }
                else {
                    should.exist(user);
                    user.should.have.property("username", "test_user");
                    done();
                }
            })
        });

        it("should delete other user", function(done) {
            db.deleteUser(userId2, (err, user) => {
                if (err) { done(err); }
                else {
                    should.exist(user);
                    user.should.have.property("username", "other_test");
                    done();
                }
            })
        })
    });
});
