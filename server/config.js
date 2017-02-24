let configHelpers = {};
if (process.env.NODE_ENV != "production") {
	try {
		configHelpers = require("./config-helpers");
	} catch(e) {
		throw new Error("No config helpers file located");
	}
}

module.exports = {
	development: {
		port: 8080,
		twitterConsumerKey: configHelpers.consumerKey,
		twitterConsumerSecret: configHelpers.consumerSecret,
		twitterCallback: "http://localhost:8080/auth/return",
		db: configHelpers.db
	},
	production: {
		port: process.env.PORT,
		twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY,
		twitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET,
		twitterCallback: "https://memeterest.shanehughes.io/auth/return",
		db: process.env.MONGO_URI
	}
};
