const express = require("express"),
	app = express(),
	routes = require("./routes"),
	env = process.env.NODE_ENV || "development",
	config = require("./config")[env];

app.use(routes);

app.listen(config.port);

