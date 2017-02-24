const express = require("express"),
	app = express(),
	passport = require("passport"),
	session = require("express-session"),
	TwitterStrategy = require("passport-twitter").Strategy,
	routes = require("./routes"),
	env = process.env.NODE_ENV || "development",
	config = require("./config")[env],
	db = require("./db");


passport.use(new TwitterStrategy({
	consumerKey: config.twitterConsumerKey,
	consumerSecret: config.twitterConsumerSecret,
	callbackURL: config.twitterCallback
}, function(token, tokenSecret, profile, cb) {
	db.userLogin(profile.id, cb);
}));

app.use(session({
	secret: config.sessionSecret
}));

app.use(express.static("public"));
app.use(routes);

app.listen(config.port);
