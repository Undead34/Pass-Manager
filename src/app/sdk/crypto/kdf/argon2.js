const constants = require("../../utils/constants")
const random = require("../tools/random")
const { argon2d, argon2i } = require("argon2-ffi");
const argon = require("argon2");

const argon2dKDF = async (password, options = null) => {
  let salt = await random.autoRandomBytes(16);
  return await argon2d.hash(Buffer.from(password), salt.bytes, options);
}

const argon2iKDF = async (password, options = null) => {
  let salt = await random.autoRandomBytes(16);
  return await argon2i.hash(Buffer.from(password), salt.bytes, options);
}

const verifyingPassword2d = async (password, encodedHash) => {
  const isCorrect = await argon2d.verify(encodedHash, Buffer.from(password));
  return isCorrect;
}

const verifyingPassword2i = async (password, encodedHash) => {
  const isCorrect = await argon2i.verify(encodedHash, Buffer.from(password));
  return isCorrect;
}

const argon2idKDF = async (password, options = null) => {
  options.type = argon.argon2id;
  return await argon.hash(Buffer.from(password), options);
}

const verifyingPassword2id = async (password, encodedHash) => {
  const isCorrect = await argon.verify(encodedHash, Buffer.from(password));
  return isCorrect;
}

module.exports = argon2 = {
  verifyingPassword2d,
  verifyingPassword2i,
  verifyingPassword2id,
  argon2dKDF,
  argon2iKDF,
  argon2idKDF,
}