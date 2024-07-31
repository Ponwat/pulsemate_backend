const memory = require("../utils/memory");
module.exports = {
	route: "/dataUpdate",
	callback: (ws, req) => {
		const last = memory.get("ws");
		if (last) last.close(4002, "forced close");

		ws.on("message", msg => {
			console.log(msg);
		});
		ws.on("close", (code, msg) => {
			memory.set("user", undefined);
			console.log("closed");
			console.log(code, msg);
		});

		ws.send("connected");
		memory.set("ws", ws);
	},
};
