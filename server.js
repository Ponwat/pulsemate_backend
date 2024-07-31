const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);

// const readFileNameInDir = require("./utils/readFileNameInDir.js");

// const addRouteFromGetPath = (path) => {
// 	const { route, callback } = require(path);
// 	app.get(route, callback);
// 	console.log(`added get: ${route}`);
// };

// const addRouteFromWsPath = (path) => {
// 	const { route, callback } = require(path);
// 	app.ws(route, callback);
// 	console.log(`added ws: ${route}`);
// };

// const getPath = "./routes/get/";
// const getFilePaths = readFileNameInDir(getPath);
// for (const filePath of getFilePaths) {
// 	addRouteFromGetPath(filePath);
// }

// const wsPath = "./websocket/";
// const wsFilePaths = readFileNameInDir(wsPath);
// for (const filePath of wsFilePaths) {
// 	addRouteFromWsPath(filePath);
// }

app.listen(3000, () => {
	console.log("ready");
});
