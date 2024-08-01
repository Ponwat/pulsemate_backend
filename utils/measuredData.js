const memory = require("./memory");

const getMeasureData = () => {
	return {
		user: memory.get("user"),
		idle: memory.get("idle"),
		error: memory.get("error"),
		sys: memory.get("sys"),
		dia: memory.get("dia"),
		pul: memory.get("pul"),
	};
};

const setMeasureData = ({ sys, dia, pul }) => {
	memory.set("idle", undefined);
	memory.set("error", undefined);
	memory.set("sys", sys);
	memory.set("dia", dia);
	memory.set("pul", pul);
};

module.exports.getMeasuredData = getMeasureData;
module.exports.setMeasuredData = setMeasureData;
