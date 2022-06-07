const random = require("../tools/random")
const crypto = require("crypto")
const util = require("util")

/**
 * Scrypt key derivation function algorithms simetric
 * @returns {Buffer} Buffer
 */
const scrypt = async (password, options) => {
    let salt = await random.autoRandomBytes(16);
    let scrypt = util.promisify(crypto.scrypt)
    let hash = await scrypt(password, salt.bytes, 32);
    return { hash: hash, salt: salt.bytes, kdf: "scrypt" };
}

const verifyingScrypt = (password, encodedHash, salt) => {
    let scrypt = util.promisify(crypto.scrypt)
    let hash = scrypt(password, salt, 32);
    return hash === encodedHash;
}

module.exports = pbkdf2 = {
    scrypt,
    verifyingScrypt
}
