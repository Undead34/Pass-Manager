const random = require("../tools/random")
const crypto = require("crypto")
const util = require("util")

/**
 * PBKDF2 key derivation function algorithms simetric
 * @returns {Buffer} Buffer
 */
const PBKDF2 = async (password, options) => {
    let salt = await random.autoRandomBytes(16);
    let pbkdf2 = util.promisify(crypto.pbkdf2)
    let hash = await pbkdf2(password, salt.bytes, 100000, 32, "sha512");
    return { hash: hash, salt: salt.bytes, kdf: "pbkdf2" };
}

const verifyingPBKDF2 = (password, encodedHash, salt) => {
    let pbkdf2 = util.promisify(crypto.pbkdf2)
    let hash = pbkdf2(password, salt, 100000, 32, "sha512");
    return hash === encodedHash;
}

module.exports = pbkdf2 = {
    PBKDF2,
    verifyingPBKDF2
}