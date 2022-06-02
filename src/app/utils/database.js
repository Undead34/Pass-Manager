const sqlite3 = require("sqlite3")

class databaseController {
  constructor(DBPath) {
    this.db = new sqlite3.Database(DBPath)
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(this.lastID)
        }
      })
    })
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, function (err, row) {
        if (err) {
          reject(err)
        } else {
          resolve(row)
        }
      })
    })
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, function (err, rows) {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  close() {
    this.db.close()
  }

  _sanitize(value) {
    let invalid = ["(", ")", ";", ":", " ", ",", "=", "\"", "'", "\\", "/", "*", "?", "|", "&", "^", "<", ">", "~", "`"];
    for (let x = 0; x < invalid.length; x++) {
      value = value.replace(invalid[x], "");
    }
    return value;
  }

  createTable(tableName, columns) {
    tableName = this._sanitize(tableName);
    let query = `CREATE TABLE IF NOT EXISTS ${tableName} (`;

    for (let column in columns) {
      column = sanitize(column);
      query += `${column} ${this._sanitize(columns[column])},`;
      query = query.slice(0, -1);
      query += ")";
    }

    return query;
  }
}

module.exports = databaseController;

// const createDataBase = (data) => {
//   let databasePath = path.join(constants.paths.root, `accounts/${data.id}.kpm`)
//   const database = new sqlite3.Database(databasePath);

//   database.serialize(() => {
//     let query = createTable("HEADER", {
//       "ID": "TEXT",
//       "VERSION": "TEXT",
//       "DATABASE_VERSION": "TEXT",
//       "MASTER_KEY_HASH": "BLOB",
//       "MASTER_KEY_SALT": "BLOB",
//       "MASTER_KEY_KEY_DERIVATION_FUNCTION": "TEXT",
//       "MASTER_KEY_KEY_DERIVATION_PARAMETERS": "TEXT",
//       "USERNAME": "BLOB",
//       "ALGORITHM": "TEXT",
//       "KEY_LENGTH": "TEXT",
//       "OPERATION_MODE": "TEXT",
//       "KDF": "TEXT"
//     })
//     database.run(query);

//     database.run(createTable("CREDENTIALS", {
//       "ID": "TEXT",
//       "USERNAME_ELEMENT": "TEXT",
//       "USERNAME_VALUE": "BLOB",
//       "PASSWORD_ELEMENT": "TEXT",
//       "PASSWORD_VALUE": "BLOB",
//       "DATE_CREATED": "TEXT",
//       "DATE_MODIFIED": "TEXT",
//       "DATE_LAST_USED": "TEXT",
//       "ORIGIN_URL": "BLOB",
//       "ACTION_URL": "BLOB",
//       "SUBMIT_ELEMENT": "TEXT",
//       "ICON_URL": "BLOB",
//       "TIMES_USED": "TEXT",
//     }));

//     let statement = database.prepare("INSERT INTO HEADER VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
//     statement.run(data.id, constants.appConstants.appVersion, constants.databaseConstants.databaseVersion, data.masterhash.hash, data.masterhash.salt, data.kdf, "DEFAULT", data.username, data.algorithm, data.keyLength, data.operationMode, data.kdf);
//     statement.finalize();
//   });

//   database.close();

//   return true;
// }

// const databaseGet = async (data, table) => {
//   table = sanitize(table);
//   console.log(table)
//   let database = new sqlite3.Database(path.join(constants.paths.root, `accounts/${data.id}.kpm`));

//   database.serialize(async () => {
//     const get = util.promisify(database.get).bind(database);
//     let rows = await get(`SELECT * FROM ${table}`)
//     console.log(rows)
//   });
//   database.close();
// }

// const compressDataBase = () => { }
// const uncompressDataBase = () => { }

// const addToDataBase = () => { }
// const delToDataBase = () => { }
// const getToDataBase = () => { }
// const edtToDataBase = () => { }
// const backupControl = () => { }

// var passwordStructure = {
//   id: "8156dcd2-59bc-4887-9db3-a47f9297267c",
//   blob_username: "dfdfdb058d3ba95b29e10438da4eb764747d5b4363815530f9f99b44db332b90ccb9c3ddd0c78b6a",
//   blob_password: "3da33278b6ab308d747dc9db0cfdf9e38da4d901dd443beb72b90cc36db104f55b64389f99b555b4",
//   blob_uri: "4778dc9db36ab370cf64389f99bdab33db12df55b549e3801dd443beb72b955bda4d908d0cc3604f",
//   hash_username: "48490f49a7f98e26e2843b939efe36ab654125f9",
//   hash_password: "97e36ab6528e26e3b9f988444ef490f125f49a39",
//   hash_uri: "0fe36a8e29526e3b9f988bf494ea344125f49697",
//   created: "2020-05-04T20:31:45+00:00",
//   modified: "2020-05-04T20:31:45+00:00"
// }

// var Folder = {
//   "id": "d9aaa38e-f80b-4823-b245-83e22a38f765",
//   "name": "child",
//   "created": "2020-05-06T18:54:49+00:00",
//   "modified": "2020-05-06T18:54:49+00:00",
//   "values": [],
//   "permission": {
//     "id": "f073fd56-e5bd-4773-9ddb-da386de6ef51",
//     "aco": "Folder",
//     "aco_foreign_key": "d9aaa38e-f80b-4823-b245-83e22a38f765",
//     "aro": "User",
//     "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
//     "type": 15,
//     "created": "2020-05-06T18:54:49+00:00",
//     "modified": "2020-05-06T18:54:49+00:00"
//   },
//   "folder_parent_id": "e2172205-139c-4e4b-a03a-933528123fff"
// }

// // let database = {
// //   headers: {
// //     version: constants.databaseVesion,
// //     platform: constants.platform,
// //     username: account.username,
// //     secret: account.secret,
// //     email: account.email,
// //     img: account.img,
// //     date: new Date(),

// //   },
// //   body: {
// //     "8156dcd2-59bc-4887-9db3-a47f9297267c": {
// //       id: "8156dcd2-59bc-4887-9db3-a47f9297267c",
// //       blob_username: "dfdfdb058d3ba95b29e10438da4eb764747d5b4363815530f9f99b44db332b90ccb9c3ddd0c78b6a",
// //       blob_password: "3da33278b6ab308d747dc9db0cfdf9e38da4d901dd443beb72b90cc36db104f55b64389f99b555b4",
// //       blob_uri: "4778dc9db36ab370cf64389f99bdab33db12df55b549e3801dd443beb72b955bda4d908d0cc3604f",
// //       hash_username: "48490f49a7f98e26e2843b939efe36ab654125f9",
// //       hash_password: "97e36ab6528e26e3b9f988444ef490f125f49a39",
// //       hash_uri: "0fe36a8e29526e3b9f988bf494ea344125f49697",
// //       created: "2022-04-21T18:28:04.030Z",
// //       modified: "2022-04-21T18:28:04.030Z"
// //     },
// //   }
// // }

// module.exports = DataBase = {
//   createDataBase,
//   databaseGet
// };