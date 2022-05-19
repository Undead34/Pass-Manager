const path = require('path');
const fileSystem = require('./fileSystem');
const constants = require('./constants');
const { initConfiguration, getConfiguration } = require('./appConfig');

/**
 * Validate if this is the first run of the app
 */
const isFirstRun = async () => {
  let frishrun = path.join(constants.paths.root, ".frishrun");
  if (!await fileSystem.exists(frishrun)) {
    return true;
  } else {
    return false;
  }
}

const init = async () => {
  if (await isFirstRun()) {
    try {
      console.log('First run');
      let homePath = constants.paths.root;
      await fileSystem.createFolder(homePath);
      await fileSystem.createFolder(path.join(homePath, "accounts"));
      await fileSystem.writeFile(path.join(homePath, "settings.json"), JSON.stringify(constants.userConstants));
      await fileSystem.writeFile(path.join(homePath, "users.json"), JSON.stringify({}));
      await fileSystem.writeFile(path.join(homePath, ".frishrun"), "true");
      initConfiguration();
      return true;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  } else {
    initConfiguration();
    const configuration = getConfiguration();
    configuration.load();
    return false;
  }
}

module.exports = onStartup = init;