const db = require("../server/db.js");
const should = require("chai").should();

describe("API", function() {
    let userId;

    describe("User", function() {

        it("should save new user", function(done) {
            db.userLogin({
                id: "123456789",
                username: "test_user"
            }, (err, user) => {
                if (err) { done(err); }
                else {
                    should.exist(user);
                    userId = user._id;
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
    });

    describe("Meme", function() {
        it("should retrieve all memes");
        it("should save new memes");
        it("should retrieve user memes");
        it("should edit user meme");
        it("should delete user memes");
    });
});
