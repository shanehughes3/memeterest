const db = require("../server/db.js");
const should = require("chai").should();

describe("API", function() {
  describe("User", function() {
      let id;

    it("should save new user", function(done) {
        db.userLogin({
            id: "123456789",
            username: "test_user"
        }, (err, user) => {
            if (err) { done(err); }
            should.exist(user);
            id = user.id;
            done();
        })
    });

    it("should get user info", function(done) {
        db.getUserInfo(id, (err, user) => {
            if (err) { done(err); }
            should.exist(user);
            user.should.have.property("twitterUsername", "test_user");
            done();
        });
    });

    it("should delete user", function(done) {
        db.deleteUser(id, (err, user) => {
            should.not.exist(err);
            should.exist(user);
            user.should.have.property("twitterUsername", "test_user");
            done(err);
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
