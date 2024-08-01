const memory = require("./memory");

const getMeasureData = () => {
	return {
		user: memory.get("user"),
		userCount: memory.get("userCount"),

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

const setError = ({ error }) => {
	memory.set("idle", undefined);
	memory.set("error", error);
	memory.set("sys", undefined);
	memory.set("dia", undefined);
	memory.set("pul", undefined);
};

const unsetData = () => {
	memory.set("idle", true);
	memory.set("error", undefined);
	memory.set("sys", undefined);
	memory.set("dia", undefined);
	memory.set("pul", undefined);
};

module.exports.getMeasuredData = getMeasureData;
module.exports.setMeasuredData = setMeasureData;
module.exports.setError = setError;
module.exports.unsetData = unsetData;
