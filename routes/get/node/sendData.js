const memory = require("../../../utils/memory.js")
const sleep = require("../../../utils/sleep.js");
const { setMeasuredData } = require("../../../utils/measuredData.js");

module.exports = {
	route: "/node/sendData",
	callback: async (req, res) => {
		memory.set("idle", false);
		setMeasuredData(req.query);
		const user = memory.get("user");
		if (user) {
			const url = `https://docs.google.com/forms/d/e/1FAIpQLSe_wwiwHKF6ha_miCbvSgNJ9EFLLJS-43fSpR4y61bDDFr_Ww/formResponse?usp=pp_url`+
				`&entry.246798995=${req.query.sys}`+
				`&entry.1979047198=${req.query.dia}`+
				`&entry.590533639=${req.query.pul}`+
				`&entry.8872831=${user.name}`;
			fetch(url);
		}
		res.json(req.query);

		let socket = undefined;
		if (user) socket = memory.get("ws");
		if (socket) socket.send(JSON.stringify(req.query));

		await sleep(30);

		memory.set("idle", true);
		if (socket) socket.send(JSON.stringify({ idle: true }));
	},
};
