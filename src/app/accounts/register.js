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
    options = constants.cipherConstants;

    let processedData = {};

    processedData.masterKey = cipherEngine.argon(data.masterKey, options.cipherSaltLength, options.cipherIterations, options.cipherHashAlgorithm);
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

    prepareData(data, options);

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
