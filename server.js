const express = require("express");
const app = express();

const { getMeasuredData, setMeasuredData } = require("./utils/measuredData.js");
const memory = require("./utils/memory.js");
const sleep = require("./utils/sleep.js");

app.get("/node/sendData", async (req, res) => {
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
	res.setHeader("Access-Control-Allow-Origin", "*");
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

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json({ error: error });

	const user = memory.get("user");
	let socket = undefined;
	if (user) socket = memory.get("ws");
	if (socket) socket.send({ error: error });

	await sleep(30);

	memory.set("error", undefined);
	memory.set("idle", true);
	if (socket) socket.send({ idle: true });
});

app.get("/getData", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(getMeasuredData());
});

app.get("/setId", (req, res) => {
	console.log(req.query);
	memory.set("user", req.query);

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(req.query);
	setTimeout(() => {
		memory.set("user", undefined);
	}, 2*1000);
});

app.get("/unsetId", (req, res) => {
	memory.set("user", undefined);

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json({ status: "ok" });
});

app.listen(3000, () => {
	console.log("ready");
});
