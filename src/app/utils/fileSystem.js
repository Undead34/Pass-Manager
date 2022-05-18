const fs = require("fs");
const crypto = require("crypto")
const { serialize, deserialize } = require("bson");

/**
 * Create a folder
 * @param {string} path path to create
 * @returns null
 */
const createFolder = (path) => {
  return new Promise((resolve, rejects) => {
    try {
      fs.mkdirSync(path, { recursive: true });
      resolve();
    } catch (error) {
      console.log(error.message);
      rejects();
    }
  });
}

/**
 * Validate if a file exists
 * @param {string} path path to validate
 * @returns boolean
 */
const exists = (path) => {
  return new Promise((resolve, rejects) => {
    try {
      let exists = fs.existsSync(path);
      resolve(exists);
    } catch (error) {
      console.log(error.message);
      rejects();
    }
  });
}

/**
 * Read data from file
 * @param {string} path path file to read
 * @returns data readed
 */
const readFile = (path) => {
  return new Promise((resolve, rejects) => {
    try {
      let data = fs.readFileSync(path);
      resolve(data);
    } catch (error) {
      console.log(error.message);
      rejects();
    }
  });
}

/**
 * List files in a folder
 * @param {string} path path to list directory
 * @returns array of files
 */
const listFiles = (path) => {
  return new Promise((resolve, rejects) => {
    try {
      let files = fs.readdirSync(path);
      resolve(files);
    } catch (error) {
      console.log(error.message);
      rejects();
    }
  });
}

/**
 * Remove a file
 * @param {*} path path to remove file
 * @returns null
 */
const deleteFile = (path) => {
  return new Promise((resolve, rejects) => {
    try {
      fs.unlinkSync(path);
      resolve();
    } catch (error) {
      console.log(error.message);
      rejects();
    }
  });
}

/**
 * Create a file or write data in it
 * @param {*} path path to save file
 * @param {*} data data to save
 * @returns null
 */
const writeFile = (path, data) => {
  return new Promise((resolve, rejects) => {
    try {
      fs.writeFileSync(path, data);
      resolve();
    } catch (error) {
      console.log(error.message);
      rejects();
    }
  });
}

/**
 * Get information of a file
 * @param {*} path path to get info
 * @returns object with info
 */
const infoFile = (path) => {
  return new Promise((resolve, rejects) => {
    try {
      let info = fs.statSync(path);
      resolve(info);
    } catch (error) {
      console.log(error.message);
      rejects();
    }
  });
}

/**
 * Remove recursively a folder
 * @param {*} path path to remove folder
 * @returns null
 */
const deleteFolder = (path) => {
  return new Promise((resolve, rejects) => {
    try {
      fs.rmdirSync(path, { recursive: true });
      resolve();
    } catch (error) {
      console.log(error.message);
      rejects();
    }
  });
}

/**
 * Serealize data to BSON
 * @param {Object} object object to serialize
 * @returns {Buffer} serialized object
 */
const BJSONSerialize = (object) => {
  return serialize(object);
}

/**
 * Deserealize data from BSON
 * @param {*} buffer buffer to deserialize
 * @returns {Object} deserialized object
 */
const BJSONDeserialize = (buffer) => {
  return deserialize(buffer);
}

/**
 * load json file return object 
 * @param {string} path path to json file
 * @returns {Object} object loaded
*/

const loadJsonFile = (path) => {
  return new Promise((resolve, rejects) => {
    try {
      let data = fs.readFileSync(path);
      let object = JSON.parse(data);
      resolve(object);
    } catch (error) {
      console.log(error.message);
      rejects();
    }
  });
}

module.exports = fileSystem = {
  createFolder,
  exists,
  readFile,
  listFiles,
  deleteFile,
  writeFile,
  infoFile,
  deleteFolder,
  BJSONSerialize,
  BJSONDeserialize,
  loadJsonFile,
};