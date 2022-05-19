const path = require('path');
const constants = require('../utils/constants');
const cipherEngine = require('../crypto/cipherEngine');
const database = require('../utils/database');

const registerUser = async (data) => {
  // const cipherEngine = new CipherEngine(data.password, "", "argon2");
  // let accountID = cipherEngine.randomUUID();
  // let accountPath = path.join(constants.paths.root, "accounts");
  // let databasePath = path.join(accountPath, accountID + ".kpm");
  // database.createDataBase(accountsFile, data);
}

module.exports = register = {
  registerUser
};

// [IPC] is registering the user
// [IPC] with the password
// [IPC] with the algorithm aes
// [IPC] with the key length 128
// [IPC] with the operation mode cbc