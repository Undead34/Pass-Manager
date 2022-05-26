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

const _getID = async (username) => {
  let ids = await _getUsers();

  for (id in ids) {
    if (Buffer.from(ids[id].username.data).equals(Buffer.from(username))) {
      return id;
    }
  }
}

const newLogin = async (data) => {
  data.id = await _getID(data.username);
  
}

module.exports = login = {
  newLogin,
  userExists
};