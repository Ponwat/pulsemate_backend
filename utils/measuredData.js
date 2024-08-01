const memory = require("./memory");

const getMeasureData = () => {
	return {
		user: memory.get("user"),
		sys: memory.get("sys"),
		dia: memory.get("dia"),
		pul: memory.get("pul"),
	};
};

const setMeasureData = ({ sys, dia, pul }) => {
	memory.set("sys", sys);
	memory.set("dia", dia);
	memory.set("pul", pul);
};

module.exports.getMeasuredData = getMeasureData;
module.exports.setMeasuredData = setMeasureData;
