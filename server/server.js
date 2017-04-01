const express = require("express"),
	app = express(),
	cookieParser = require("cookie-parser"),
	bodyParser = require("body-parser"),
	passport = require("passport"),
	session = require("express-session"),
	TwitterStrategy = require("passport-twitter").Strategy,
	scribe = require("express-scribe"),
	routes = require("./routes"),
	env = process.env.NODE_ENV || "development",
	config = require("./config")[env],
	db = require("./db");

app.use(scribe({removeIPv4Prefix: true}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
	secret: config.sessionSecret,
	cookie: {
		secure: false,
		maxAge: null
	}
}));


passport.use(new TwitterStrategy({
	consumerKey: config.twitterConsumerKey,
	consumerSecret: config.twitterConsumerSecret,
	callbackURL: config.twitterCallback
}, function(token, tokenSecret, profile, cb) {
	db.userLogin(profile, cb);
}));
passport.serializeUser((user, cb) => {
	cb(null, user);
});
passport.deserializeUser((obj, cb) => {
	cb(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(routes);

app.listen(config.port);
