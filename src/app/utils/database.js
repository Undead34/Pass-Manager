const constants = require("./constants")
const sqlite3 = require("sqlite3")
const path = require("path")

// return SQLITE3 query
const createTable = (tableName, columns) => {
  let query = `CREATE TABLE IF NOT EXISTS ${tableName} (`;
  for (let column in columns) {
    query += `${column} ${columns[column]},`;
  }
  query = query.slice(0, -1);
  query += ")";
  return query;
}

const createDataBase = async (data) => {
  const database = new sqlite3.Database(path.join(constants.paths.root, `accounts/${data.id}.kpm`));

  database.serialize(() => {
    database.run(createTable("HEADER", { "ID": "TEXT", "VERSION": "TEXT", "DATABASE_VERSION": "TEXT" }));
    database.run(createTable("LOGIN_DATA", { "MASTER_KEY_HASH": "BLOB", "MASTER_KEY_SALT": "BLOB", "MASTER_KEY_KEY_DERIVATION_FUNCTION": "TEXT" }));
    database.run(createTable("CREDENTIALS", {
      "ID": "TEXT",
      "USERNAME_ELEMENT": "TEXT",
      "USERNAME_VALUE": "BLOB",
      "PASSWORD_ELEMENT": "TEXT",
      "PASSWORD_VALUE": "BLOB",
      "DATE_CREATED": "TEXT",
      "DATE_MODIFIED": "TEXT",
      "DATE_LAST_USED": "TEXT",
      "ORIGIN_URL": "BLOB",
      "ACTION_URL": "BLOB",
      "SUBMIT_ELEMENT": "TEXT",
      "ICON_URL": "BLOB",
      "TIMES_USED": "TEXT",
    }));

    let statement = database.prepare("INSERT INTO HEADER VALUES (?,?,?)");
    statement.run(data.id, constants.appConstants.appVersion, constants.databaseConstants.databaseVersion);
    statement.finalize();

    statement = database.prepare("INSERT INTO LOGIN_DATA VALUES (?,?,?)");
    statement.run(data.masterhash.hash, data.masterhash.salt, data.kdf);
    statement.finalize();
  });
  database.close();
}

const compressDataBase = () => { }
const uncompressDataBase = () => { }

const addToDataBase = () => { }
const delToDataBase = () => { }
const getToDataBase = () => { }
const edtToDataBase = () => { }
const backupControl = () => { }


var passwordStructure = {
  id: "8156dcd2-59bc-4887-9db3-a47f9297267c",
  blob_username: "dfdfdb058d3ba95b29e10438da4eb764747d5b4363815530f9f99b44db332b90ccb9c3ddd0c78b6a",
  blob_password: "3da33278b6ab308d747dc9db0cfdf9e38da4d901dd443beb72b90cc36db104f55b64389f99b555b4",
  blob_uri: "4778dc9db36ab370cf64389f99bdab33db12df55b549e3801dd443beb72b955bda4d908d0cc3604f",
  hash_username: "48490f49a7f98e26e2843b939efe36ab654125f9",
  hash_password: "97e36ab6528e26e3b9f988444ef490f125f49a39",
  hash_uri: "0fe36a8e29526e3b9f988bf494ea344125f49697",
  created: "2020-05-04T20:31:45+00:00",
  modified: "2020-05-04T20:31:45+00:00"
}


var Folder = {
  "id": "d9aaa38e-f80b-4823-b245-83e22a38f765",
  "name": "child",
  "created": "2020-05-06T18:54:49+00:00",
  "modified": "2020-05-06T18:54:49+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permissions": [
    {
      "id": "1262b7d3-be18-4b5f-bc83-4c995235bb84",
      "aco": "Folder",
      "aco_foreign_key": "d9aaa38e-f80b-4823-b245-83e22a38f765",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 1,
      "created": "2020-05-06T18:54:50+00:00",
      "modified": "2020-05-06T18:54:50+00:00",
      "group": null,
      "user": {
        "id": "f848277c-5398-58f8-a82a-72397af2d450",
        "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
        "username": "ada@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-03-02T11:14:33+00:00",
        "modified": "2020-04-02T11:14:33+00:00",
        "profile": {
          "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
          "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
          "first_name": "Ada",
          "last_name": "Lovelace",
          "created": "2020-05-02T11:14:33+00:00",
          "modified": "2020-05-02T11:14:33+00:00",
          "avatar": {
            "id": "5426cb53-d909-40eb-9202-38f2c1f94084",
            "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
            "foreign_key": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
            "model": "Avatar",
            "filename": "ada.png",
            "filesize": 170049,
            "mime_type": "image\/png",
            "extension": "png",
            "hash": "97e36ab6528e26e3b9f988444ef490f125f49a39",
            "path": "Avatar\/84\/a1\/21\/5426cb53d90940eb920238f2c1f94084\/5426cb53d90940eb920238f2c1f94084.png",
            "adapter": "Local",
            "created": "2020-05-02T11:14:35+00:00",
            "modified": "2020-05-02T11:14:35+00:00",
            "url": {
              "medium": "img\/public\/Avatar\/84\/a1\/21\/5426cb53d90940eb920238f2c1f94084\/5426cb53d90940eb920238f2c1f94084.a99472d5.png",
              "small": "img\/public\/Avatar\/84\/a1\/21\/5426cb53d90940eb920238f2c1f94084\/5426cb53d90940eb920238f2c1f94084.65a0ba70.png"
            }
          }
        },
        "last_logged_in": ""
      }
    },
    {
      "id": "f073fd56-e5bd-4773-9ddb-da386de6ef51",
      "aco": "Folder",
      "aco_foreign_key": "d9aaa38e-f80b-4823-b245-83e22a38f765",
      "aro": "Group",
      "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "type": 15,
      "created": "2020-05-06T18:54:49+00:00",
      "modified": "2020-05-06T18:54:49+00:00",
      "group": {
        "id": "516c2db6-0aed-52d8-854f-b3f3499995e7",
        "name": "Leadership team",
        "deleted": false,
        "created": "2016-01-29T13:39:25+00:00",
        "modified": "2016-01-29T13:39:25+00:00",
        "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856"
      }
    }
  ],
  "permission": {
    "id": "f073fd56-e5bd-4773-9ddb-da386de6ef51",
    "aco": "Folder",
    "aco_foreign_key": "d9aaa38e-f80b-4823-b245-83e22a38f765",
    "aro": "User",
    "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "type": 15,
    "created": "2020-05-06T18:54:49+00:00",
    "modified": "2020-05-06T18:54:49+00:00"
  },
  "folder_parent_id": "e2172205-139c-4e4b-a03a-933528123fff"
}

// let database = {
//   headers: {
//     version: constants.databaseVesion,
//     platform: constants.platform,
//     username: account.username,
//     secret: account.secret,
//     email: account.email,
//     img: account.img,
//     date: new Date(),

//   },
//   body: {
//     "8156dcd2-59bc-4887-9db3-a47f9297267c": {
//       id: "8156dcd2-59bc-4887-9db3-a47f9297267c",
//       blob_username: "dfdfdb058d3ba95b29e10438da4eb764747d5b4363815530f9f99b44db332b90ccb9c3ddd0c78b6a",
//       blob_password: "3da33278b6ab308d747dc9db0cfdf9e38da4d901dd443beb72b90cc36db104f55b64389f99b555b4",
//       blob_uri: "4778dc9db36ab370cf64389f99bdab33db12df55b549e3801dd443beb72b955bda4d908d0cc3604f",
//       hash_username: "48490f49a7f98e26e2843b939efe36ab654125f9",
//       hash_password: "97e36ab6528e26e3b9f988444ef490f125f49a39",
//       hash_uri: "0fe36a8e29526e3b9f988bf494ea344125f49697",
//       created: "2022-04-21T18:28:04.030Z",
//       modified: "2022-04-21T18:28:04.030Z"
//     },
//   }
// }

module.exports = DataBase = {
  createDataBase,
};