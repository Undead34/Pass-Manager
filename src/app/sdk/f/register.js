const cipherEngine = require('../crypto/cipherEngine');
const fileSystem = require('../utils/fileSystem');
const constants = require('../utils/constants');
const database = require('../utils/database');
const path = require('path');

const validateUserExists = async (username) => {
  username = Buffer.from(username).toString('base64');
  let usersPath = path.join(constants.paths.root, "users.json");
  if (await fileSystem.exists(usersPath)) {
    let users = await fileSystem.readFile(usersPath);
    users = JSON.parse(users);
    if (users[username]) {
      return true;
    } else {
      return false;
    }
  } else {
    fileSystem.writeFile(usersPath, JSON.stringify({}));
    return false;
  }
}

const prepareData = async (data, options) => {
  if (typeof options === "string" && options === "default") {
    options = constants.cipherConstants.kdf.argon;
    let processedData = {};
    processedData.APP_VERSION = constants.appConstants.appVersion;
    processedData.DATABASE_VERSION = constants.databaseConstants.databaseVersion;
    processedData.MASTER_KEY_HASH = await Buffer.from(await cipherEngine.argon.argon2idKDF(data.password, options));
    processedData.MASTER_KEY_SALT = null;
    processedData.MASTER_KEY_IV = null;
    processedData.KEY_LENGTH = 32 * 8;
    processedData.KEY_DERIVATION_FUNCTION = "argon2id";
    processedData.KEY_DERIVATION_PARAMETERS = await JSON.stringify(options);
    processedData.ALGORITHM = "aes-256-cbc";
    processedData.ALGORITHM_PARAMETERS = "default";

    return processedData;
  }
}

const registerUser = async (data, options) => {

  if (await validateUserExists(data.username)) {
    return { success: false, message: "User already exists" };
  } else {
    try {
      let id = cipherEngine.randomUUID();
      let dbPath = path.join(constants.paths.database, `/${id}.kpdb`);
      const db = new database(dbPath);

      let header = await db.createTable("HEADER", constants.databaseConstants.databaseHeader);
      await db.run(header);
      let credentials = await db.createTable("CREDENTIALS", constants.databaseConstants.databaseCredentials);
      await db.run(credentials);

      let newData = await prepareData(data, options);
      newData.USER_ID = id;
      newData.USER_NAME = data.username;
      let dataQuery = await db.insert("HEADER", newData);
      await db.run(dataQuery.query, dataQuery.params);

      let newCredentials = {};
      newCredentials.ID = cipherEngine.randomUUID();
      newCredentials.USERNAME_ELEMENT = "input";
      newCredentials.USERNAME_VALUE = await Buffer.from(data.username);
      newCredentials.PASSWORD_ELEMENT = "text";
      newCredentials.PASSWORD_VALUE = await Buffer.from(data.password);
      newCredentials.DATE_CREATED = new Date().toISOString();
      newCredentials.DATE_MODIFIED = new Date().toISOString();
      newCredentials.DATE_EXPIRED = new Date().toISOString();
      newCredentials.DATE_DELETED = null;
      newCredentials.DATE_LAST_USED = null;
      newCredentials.ORIGIN_URL = await Buffer.from("www.example.com");
      newCredentials.ACTION_URL = await Buffer.from("www.example.com/login");
      newCredentials.SUBMIT_ELEMENT = "button";
      newCredentials.ICON_URL = null;
      newCredentials.TIMES_USED = 0;

      let credentialsQuery = await db.insert("CREDENTIALS", newCredentials);
      await db.run(credentialsQuery.query, credentialsQuery.params);

      let usersPath = path.join(constants.paths.root, "users.json");
      let users = await fileSystem.readFile(usersPath);
      users = JSON.parse(users);
      let username = Buffer.from(data.username).toString('base64');
      users[username] = id;
      await fileSystem.writeFile(usersPath, JSON.stringify(users));

      db.close();

      return { success: true, message: "User registered" };
    } catch (error) {
      return { success: false, message: error.message ? error.message : error };
    }
  }
}




// const _getUsers = async () => {
//   let userPath = path.join(constants.paths.root, "users.json");
//   if (await fileSystem.exists(userPath)) {
//     let users = await fileSystem.readFile(userPath);
//     return JSON.parse(users);
//   }
//   else {
//     await fileSystem.writeFile(userPath, JSON.stringify({}));
//     return {};
//   }
// };

// const userExists = async (username) => {
//   let users = await _getUsers();
//   for (user in users) {
//     if (Buffer.from(users[user].username.data).equals(Buffer.from(username))) {
//       return true;
//     }
//   }
//   return false;
// }

// const registerUser = async (data) => {
//   try {
//     data.id = cipherEngine.randomUUID();
//     if (data.kdf === "argon2") {
//       data.masterhash = await cipherEngine.argon.argon2dKDF(data.password);
//     } else if (data.kdf === "pbkdf2") {
//       data.masterhash = await cipherEngine.pbkdf2.PBKDF2(data.password);
//     }
//     else if (data.kdf === "scrypt") {
//       data.masterhash = await cipherEngine.scrypt.scrypt(data.password);
//     }
//     data.username = await Buffer.from(data.username, "utf-8");


//     // database.createDataBase(data);
//     let users = await _getUsers();
//     users[data.id] = { username: data.username }
//     await fileSystem.writeFile(path.join(constants.paths.root, "users.json"), JSON.stringify(users));
//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

module.exports = {
  registerUser: registerUser
};
