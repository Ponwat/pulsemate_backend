const memory = require("../../../utils/memory.js");
const sleep = require("../../../utils/sleep.js");

module.exports = {
	route: "/node/sendError",
	callback: async (req, res) => {
		memory.set("idle", false);
		const error = req.query.error;
		memory.set("error", error);

		res.json(error);

		const user = memory.get("user");
		let socket = undefined;
		if (user) socket = memory.get("ws");
		if (socket) socket.send({ error: error });

		await sleep(3);

		memory.set("idle", true);
		if (socket) socket.send({ idle: true });
	},
};
