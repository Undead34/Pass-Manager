const random = require("../tools/random")
const { argon2d, argon2i } = require("argon2-ffi");
const utils = require("util")

const argon2dKDF = async () => {

}

const argon2iKDF = async () => {

}

const verifyingPassword2d = async (password, encodedHash) => {
  const isCorrect = await argon2d.verify(encodedHash, Buffer.from(password));
  return isCorrect;
}

const verifyingPassword2i = async (password, encodedHash) => {
  const isCorrect = await argon2i.verify(encodedHash, Buffer.from(password));
  return isCorrect;
}

module.exports = argon2 = {
  verifyingPassword2d,
  verifyingPassword2i,
  argon2dKDF,
  argon2iKDF
}