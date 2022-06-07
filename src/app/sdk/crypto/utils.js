const fileSystem = require("../utils/fileSystem");
const symmetric = require("./symmetric.json");
const random = require("./tools/random")
const crypto = require("crypto");
const path = require("path");

const argon = require("./kdf/argon2");
const pbkdf2 = require("./kdf/PBKDF2");
const scrypt = require("./kdf/scrypt");

const generateIV = async () => {
  let buffer = await random.autoRandomBytes(16)
  let arrayA = new ArrayBuffer(buffer.bytes.length);
  let arrayB = new Uint8Array(arrayA);
  for (var i = 0; i < buffer.bytes.length; ++i) {
    arrayB[i] = buffer.bytes[i];
  }
  return arrayA;
}

const getAlgorithmsSymmetric = (algorithm, mode, keySize) => {
  return algorithmsSymmetric[algorithm][keySize][mode];
}

const randomUUID = () => {
  return crypto.randomUUID();
}

module.exports = cipherEngine = {
  generateIV,
  getAlgorithmsSymmetric,
  randomUUID,
  argon,
  pbkdf2,
  scrypt,
};
