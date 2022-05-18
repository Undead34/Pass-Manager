const path = require('path');
const constants = require('../utils/constants');
const fileSystem = require('../utils/fileSystem');
const database = require('../utils/database');

const registerUser = async (data) => {
  let accountsID = fileSystem.randomUUID();
  let accountsPath = path.join(constants.paths.root, "accounts");
  let accountsFile = path.join(accountsPath, accountsID + ".kpm");
  data.id = accountsID;



  database.createDataBase(accountsFile, data);
}

module.exports = register = {
  registerUser
};