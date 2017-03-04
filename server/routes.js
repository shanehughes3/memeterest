
const express = require("express")
const path = require("path");
const passport = require("passport");
const db = require("./db");

const router = express.Router();

/*
 * AUTH
 */

router.get("/auth/login", passport.authenticate("twitter"));

router.get("/auth/return",
	passport.authenticate("twitter",
	{ successRedirect: "/",
	failureRedirect: "/auth/login" }),
	(req, res) => {
		res.redirect("/");
	}
);

router.get("/auth/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});


/*
 * MEME API
 */

router.get("/api/all", (req, res) => {
	
});

router.get("/api/:userId", (req, res) => {
	// get user memes
});

router.post("/api/:userId", (req, res) => {
	// new meme
});

router.put("/api/:userId/:memeId", (req, res) => {
	// edit meme
});

router.delete("/api/:userId/:memeId", (req, res) => {
	// delete meme
});

/*
 * MAIN
 */

router.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname + "/../public/index.html"));
});

module.exports = router;
