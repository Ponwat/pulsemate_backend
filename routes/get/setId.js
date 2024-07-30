const memory = require("../../utils/memory.js");

module.exports = {
	route: "/setId",
	callback: (req, res) => {
		console.log(req.query);
		memory.set("user", req.query);

		res.setHeader("Access-Control-Allow-Origin", "*");
		res.json(req.query);
	},
};
