const memory = require("../../utils/memory.js");
const { getMeasuredData } = require("../../utils/measuredData.js");

module.exports = {
	route: "/getData",
	callback: (req, res) => {
		if (memory.get("idle")) {
			res.json({ idle: true });
			return;
		}
		if (memory.get("error")) {
			res.json({ error: true });
			return;
		}

		res.json(getMeasuredData());
	},
};
