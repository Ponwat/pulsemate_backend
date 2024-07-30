const memory = require("../../../utils/memory.js")
const sleep = require("../../../utils/sleep.js");
const { setMeasuredData } = require("../../../utils/measuredData.js");

module.exports = {
	route: "/node/sendData",
	callback: async (req, res) => {
		memory.set("idle", false);
		setMeasuredData(req.query);

		res.json(req.query);

		const user = memory.get("user");
		let socket = undefined;
		if (user) socket = memory.get("ws");
		if (socket) socket.send(JSON.stringify(req.query));

		await sleep(3);

		memory.set("idle", true);
		if (socket) socket.send(JSON.stringify({ idle: true }));
	},
};
