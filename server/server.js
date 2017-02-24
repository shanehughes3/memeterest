const express = require("express"),
	app = express(),
	passport = require("passport"),
	TwitterStrategy = require("passport-twitter").Strategy,
	routes = require("./routes"),
	env = process.env.NODE_ENV || "development",
	config = require("./config")[env];

passport.use(new TwitterStrategy({
	consumerKey: config.twitterConsumerKey,
	consumerSecret: config.twitterConsumerSecret,
	callbackURL: config.twitterCallback
}, function(token, tokenSecret, profile, done) {

}));

app.use(express.static("public"));
app.use(routes);

app.listen(config.port);
