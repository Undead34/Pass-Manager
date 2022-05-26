const cipherEngine = require('../crypto/cipherEngine');
const fileSystem = require('../utils/fileSystem');
const constants = require('../utils/constants');
const database = require('../utils/database');
const path = require('path');

const _getUsers = async () => {
  let userPath = path.join(constants.paths.root, "users.json");
  if (await fileSystem.exists(userPath)) {
    let users = await fileSystem.readFile(userPath);
    return JSON.parse(users);
  }
  else {
    await fileSystem.writeFile(userPath, JSON.stringify({}));
    return {};
  }
};

const userExists = async (username) => {
  let users = await _getUsers();
  for (user in users) {
    if (Buffer.from(users[user].username.data).equals(Buffer.from(username))) {
      return true;
    }
  }
  return false;
}

const registerUser = async (data) => {
  try {
    data.id = cipherEngine.randomUUID();
    if (data.kdf === "argon2") {
      data.masterhash = await cipherEngine.argon.argon2dKDF(data.password);
    } else if (data.kdf === "pbkdf2") {
      data.masterhash = await cipherEngine.pbkdf2.PBKDF2(data.password);
    }
    else if (data.kdf === "scrypt") {
      data.masterhash = await cipherEngine.scrypt.scrypt(data.password);
    }
    data.username = await Buffer.from(data.username, "utf-8");

    database.createDataBase(data);
    let users = await _getUsers();
    users[data.id] = { username: data.username }
    await fileSystem.writeFile(path.join(constants.paths.root, "users.json"), JSON.stringify(users));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = register = {
  registerUser,
  userExists
};
