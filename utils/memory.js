module.exports = class memory {
	static memory = {
		idle: true,
		userCount: 1,
	};
	static get = (key) => this.memory[key];
	static set = (key, value) => {
		this.memory[key] = value;
	};
};
