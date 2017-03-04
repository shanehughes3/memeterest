
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
	db.getAllMemes({
		offset: req.query.offset,
		limit: req.query.limit
	}, (err, memes) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		} else {
			res.json({ memes: memes });
		}
	});
});

router.get("/api/:userId", (req, res) => {
	db.getUserMemes(req.user.id, (err, memes) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		} else {
			res.json({ memes: memes });
		}
	})
});

router.post("/api/:userId", (req, res) => {
	db.newMeme(req.user.id, req.body.meme, (err, meme) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);
		} else {
			res.json({ meme: meme });
		}
	})
});

router.put("/api/:userId/:memeId", (req, res) => {
	if (req.user.id != req.params.userId) {
		res.sendStatus(401);
	} else {
		db.editMeme(req.user.id, req.params.memeId,
		req.body.edits, (err, meme) => {
			if (err) {
				if (err.message == "Unauthorized") {
					res.sendStatus(401);
				} else if (err.message == "No meme found") {
					res.sendStatus(400);
				} else {
					console.error(err);
					res.setStatus(500);
				}
			} else {
				res.json({ meme: meme });
			}
		})
	}
});

router.delete("/api/:userId/:memeId", (req, res) => {
	if (req.user.id != req.params.userId) {
		res.sendStatus(401);
	} else {
		db.deleteMeme(req.user.id, req.params.memeId,
		(err, meme) => {
			if (err) {
				if (err.message == "Unauthorized") {
					res.sendStatus(401);
				} else {
					console.error(err);
					res.sendStatus(500);
				}
			} else {
				res.json({ meme: meme });
			}
		})
	}
});

/*
 * MAIN
 */

router.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname + "/../public/index.html"));
});

module.exports = router;
