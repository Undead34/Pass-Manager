const _default = require("./config.default.json");
const _debug = require("./config.debug.json");

class Config {
    constructor() {
        this.config = _default;
        this.debug = _debug;
    }
    
    get(key) {
        return this.config[key];
    }
    
    set(key, value) {
        this.config[key] = value;
    }
}

const _config = new Config();

module.exports = {
    set: (key, value) => {
        _config.set(key, value);
    },
    get: (key) => {
        return _config.get(key);
    },
    getConfig: () => {
        return _config;
    },
};