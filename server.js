const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);

const { getMeasuredData, setMeasuredData } = require("./utils/measuredData.js");
const memory = require("./utils/memory.js");
const sleep = require("./utils/sleep.js");

app.get("/node/sendData", async (req, res) => {
	memory.set("idle", false);
	setMeasuredData(req.query);
	const user = memory.get("user");
	if (user) {
		const url =
			`https://docs.google.com/forms/d/e/1FAIpQLSe_wwiwHKF6ha_miCbvSgNJ9EFLLJS-43fSpR4y61bDDFr_Ww/formResponse?usp=pp_url` +
			`&entry.246798995=${req.query.sys}` +
			`&entry.1979047198=${req.query.dia}` +
			`&entry.590533639=${req.query.pul}` +
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
});

app.get("/node/sendError", async (req, res) => {
	memory.set("idle", false);
	const error = req.query.error;
	memory.set("error", error);

	res.json(error);

	const user = memory.get("user");
	let socket = undefined;
	if (user) socket = memory.get("ws");
	if (socket) socket.send({ error: error });

	await sleep(30);

	memory.set("idle", true);
	if (socket) socket.send({ idle: true });
});

app.get("/getData", (req, res) => {
	if (memory.get("idle")) {
		res.json({ idle: true });
		return;
	}
	if (memory.get("error")) {
		res.json({ error: true });
		return;
	}

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(getMeasuredData());
});

app.get("/setId", (req, res) => {
	console.log(req.query);
	memory.set("user", req.query);

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(req.query);
});

app.ws("/dataUpdate", (ws, req) => {
	const last = memory.get("ws");
	if (last) last.close(4002, "forced close");

	ws.on("message", (msg) => {
		console.log(msg);
	});
	ws.on("close", (code, msg) => {
		memory.set("user", undefined);
		console.log("closed");
		console.log(code, msg);
	});

	ws.send("connected");
	memory.set("ws", ws);
});

app.listen(3000, () => {
	console.log("ready");
});
