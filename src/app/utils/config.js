const fileSystem = require('./fileSystem');
const path = require('path');
const constants = require('./constants');
/**
 * Class of the configuration. 
*/

class Configuration {
  constructor() {
    this.path = path.join(constants.paths.root, "settings.json");
    this.lastModified = this._lastModified();
  }

  async _lastModified() {
    try {
      let info = await fileSystem.infoFile(this.path);
      return info.mtime.getTime();
    } catch (error) {
      return 0;
    }
  }

  set(key, value) {
    this.config[key] = value;
  }

  get(key) {
    return this.config[key];
  }

  async save() {
    try {
      if (this.lastModified && this.lastModified !== await this._lastModified()) {
        console.warn('Not saving settings, it has been externally modified.');
        return;
      }
      try {
        let buffer = await fileSystem.BJSONSerialize(this.config);
        await fileSystem.writeFile(this.path, buffer);
      } catch (error) {
        console.warn('Failed saving settings with error: ', error);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async load() {
    try {
      let buffer = await fileSystem.readFile(this.path);
      let config = await fileSystem.BJSONDeserialize(buffer);
      this.config = config;
    } catch (error) {
      console.log(error.message);
    }
  }

}

module.exports = Configuration;