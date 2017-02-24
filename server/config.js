if (process.env.NODE_ENV != "production") {
	try {
		const twitterKeys = require("./twitter-config");
	} catch() {
		throw new Error("No twitter OAuth config file located");
	}
}

module.exports = {
	development: {
		port: 8080,
		twitterConsumerKey: twitterKeys.consumerKey,
		twitterConsumerSecret: twitterKeys.consumerSecret,
		twitterCallback: "http://localhost:8080/auth/return"
	},
	production: {
		port: process.env.PORT,
		twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY,
		twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET,
		twitterCallback: "https://memeterest.shanehughes.io/auth/return"
	}
};
