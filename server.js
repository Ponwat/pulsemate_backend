const express = require("express");
const app = express();

const {
	getMeasuredData,
	setMeasuredData,
	setError,
	unsetData,
} = require("./utils/measuredData.js");
const memory = require("./utils/memory.js");

const waitThenResetData = (seconds) => {
	const thisData = setTimeout(() => {
		const lastData = memory.get("lastData");
		if (lastData) clearTimeout(lastData);

		unsetData();
	}, seconds * 1000);
	memory.set("lastData", thisData);
};

app.get("/node/sendData", async (req, res) => {
	setMeasuredData(req.query);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(req.query);

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

	waitThenResetData(60);
});

app.get("/node/sendError", async (req, res) => {
	setError(req.query);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(req.query);

	waitThenResetData(60);
});

app.get("/getData", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(getMeasuredData());
	console.log(getMeasuredData());
});

app.get("/setId", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json(req.query);
});

app.get("/unsetId", (req, res) => {
	memory.set("user", undefined);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.json({ userCount: userCount });
});

app.listen(3000, () => {
	console.log("ready");
});
