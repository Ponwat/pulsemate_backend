module.exports = class memory {
	static memory = {
		idle: true,
        ws: undefined
    };
	static get = key => this.memory[key];
	static set = (key, value) => { this.memory[key] = value; }
}