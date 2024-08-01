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

	await sleep(60);

	memory.set("sys", undefined);
	memory.set("dia", undefined);
	memory.set("pul", undefined);
	memory.set("idle", true);
});

app.get("/node/sendError", async (req, res) => {
	const error = req.query.error;
	memory.set("idle", false);
	memory.set("error", error);

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json({ error: error });

	await sleep(60);

	memory.set("error", undefined);
	memory.set("idle", true);
});

app.get("/getData", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(getMeasuredData());
});

app.get("/setId", (req, res) => {
	const timeoutId = memory.get("timeout");
	if (timeoutId) clearTimeout(timeoutId);
	memory.set("user", req.query);

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(req.query);
	const id = setTimeout(() => {
		memory.set("user", undefined);
	}, 2*1000);
	memory.set("timeout", id);
});

app.get("/unsetId", (req, res) => {
	memory.set("user", undefined);

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json({ status: "ok" });
});

app.listen(3000, () => {
	console.log("ready");
});
