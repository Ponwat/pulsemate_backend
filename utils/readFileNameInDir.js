const fs = require("fs");
module.exports = readFileNameInDir = path => {
	let filePaths = [];
	for (const fileName of fs.readdirSync(path)) {
		const filePath = path+fileName;
		if (fs.lstatSync(filePath).isDirectory()) {
			const innerFilePaths = readFileNameInDir(filePath+"/");
			filePaths = filePaths.concat(innerFilePaths);
			continue;
		};
		filePaths.push(filePath);
	}
	return filePaths;
};