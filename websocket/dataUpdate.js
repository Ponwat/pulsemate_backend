const memory = require("../utils/memory");
module.exports = {
	route: "/dataUpdate",
	callback: (ws, req) => {
		const last = memory.get("ws");
		if (last) last.close();

		ws.on("message", (msg) => {
			console.log(msg);
		});
		ws.on("close", () => {
			memory.set("user", undefined);
			console.log("closed");
		});

		ws.send("connected");
		memory.set("ws", ws);
	},
};
