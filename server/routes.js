const express = require("express");

const router = express.Router();

/*
 * MAIN
 */

router.get("/", (req, res) => {
	
});

/*
 * AUTH
 */

router.get("/auth/login", (req, res) => {
	passport.authenticate("twitter");
});

router.get("/auth/return", (req, res) => {
	
});

/*
 * MEME API
 */

router.get("/api/all", (req, res) => {
	// get all memes
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
