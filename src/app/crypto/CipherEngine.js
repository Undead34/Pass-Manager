const crypto = require("crypto");
const argon2 = require("argon2");
const AlgorithmsSymmetric = require("./Symmetric");
const Random = require("./Random")

class CipherEngine {

    constructor(passphrase = "asd", algorithm = "aes", kdf = "argon2") {
        this.passphrase = typeof passphrase === "string" ? passphrase : undefined;
        this.algorithm = typeof algorithm === "object" ? algorithm : undefined;
        this.kdf = typeof kdf === "string" ? kdf : undefined;
    }

    /**
     * Cipher data with secret key
     * @param {Object} options algorithm, key, iv and aditional options
     * @param {string} data data to cipher in utf8
     * @returns {string} cipher text in hex
     */
    async cipherSymmetric(options, data) {
        try {
            const cipher = crypto.createCipheriv(options.algorithm, options.key, options.iv, options.options);
            let encrypted = cipher.update(data, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
        } catch (error) {
            console.log(error.message);
            return;
        }
    }

    /**
     * decipher data with secret key
     * @param {Object} options algorithm, key, iv and aditional options 
     * @param {string} data data to cipher in utf8
     * @returns {string} 
     */
    async decipherSymmetric(options, data) {
        try {
            const decipher = crypto.createDecipheriv(options.algorithm, options.key, options.iv, options.options);
            let decrypted = decipher.update(data, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        } catch (error) {
            console.log(error.message);
            return;
        }
    }

    async generateIV() {
        let buf = await Random.autoRandomBytes(16)
        var ab = new ArrayBuffer(buf.bytes.length);
        var view = new Uint8Array(ab);
        for (var i = 0; i < buf.bytes.length; ++i) {
            view[i] = buf.bytes[i];
        }
        return ab;
    }

    getAlgorithmsSymmetric(algorithm, mode, keySize) {
        const algorithmsSymmetric = new AlgorithmsSymmetric();
        let _algorithm = algorithmsSymmetric.algorithms[algorithm];
        if (_algorithm.keySizes.includes(parseInt(keySize))) {
            let _mode = _algorithm.operationMode[mode];
            return { algorithm: `${_algorithm.name}-${keySize}-${_mode.name}`, keySize: _mode[`_${keySize}`] };	
        } else {
            return "Options incorrect";
        }
    }

    /**
 * The key engine is in charge of creating, changing, verifying, modify the user's keys.
 * 
 * 
 * @param {string} passphrase password or master key of user
 * @param {string} algorithm AES, 3DES, ChaCha20, ChaCha20-Poly1305, ...
 * @returns {KeyEngine} KeyEngine
*/


    /**
     * Scrypt key derivation function algorithms simetric
     * @returns {Buffer} Buffer
     */
    async _scryptSymmetric() {
        try {
            const salt = await Random.autoRandomBytes(16);
            if (salt.source === "anu-quantum-random") console.log("source: secure anu-quantum-random");
            let key = crypto.scryptSync(this.passphrase, salt.bytes, this.algorithm.keySize / 8);
            return { key: key, salt: salt.bytes, kdf: "scrypt" };
        } catch (error) {
            console.log(error.message);
            return undefined;
        }
    }

    /**
     * PBKDF2 key derivation function algorithms simetric
     * @returns {Buffer} Buffer
     */
    async _pbkdf2Symmetric() {
        try {
            const salt = await Random.autoRandomBytes(16);
            if (salt.source === "anu-quantum-random") console.log("source: secure anu-quantum-random");
            let key = crypto.pbkdf2Sync(this.passphrase, salt.bytes, 100000, this.algorithm.keySize / 8, "sha512");
            return { key: key, salt: salt.bytes, kdf: "pbkdf2" };
        } catch (error) {
            console.log(error.message);
            return undefined;
        }
    }

    /**
     * Argon2 key derivation function algorithms simetric
     * @returns {Buffer} Buffer
    */
    async _argon2Symmetric() {
        try {
            const salt = await Random.autoRandomBytes(16);
            if (salt.source === "anu-quantum-random") console.log("source: secure anu-quantum-random")
            let key_argon = await argon2.hash(this.passphrase, { salt: salt.bytes, timeCost: 2, memoryCost: 1024, parallelism: 1, hashLength: this.algorithm.keySize / 8 });
            let key_b64 = key_argon.split("$").at(-1);
            return { key: Buffer.from(key_b64, "base64"), salt: salt.bytes, kdf: "argon2" };
        } catch (error) {
            console.log(error.message);
            return undefined;
        }
    }

    async autoDeriveKeySymmetric() {
        if (this.kdf === "scrypt") {
            return await this._scryptSymmetric();
        } else if (this.kdf === "pbkdf2") {
            return await this._pbkdf2Symmetric();
        } else if (this.kdf === "argon2") {
            return await this._argon2Symmetric();
        } else {
            throw new Error("KDF not supported");
        }
    }

    /**
     * argon2 password hashing
     * @param {string} passphrase password or master key of user
     * @returns {string} hash 
     */
    async safeStorePassphrase(passphrase) {
        this.passphrase = passphrase;
        let key_argon = await argon2.hash(this.passphrase, { timeCost: 2, memoryCost: 1024, parallelism: 1, hashLength: this.algorithm.keySize / 8 });
        return key_argon;
    }

    randomUUID = () => {
        return crypto.randomUUID();
    }

    /**
 * encode data to hex
 * @param {sting} data 
 * @returns string
 */
    encodeTohex(data) {
        return Buffer.from(data).toString('hex');
    }

    /**
     * decode data to hex
     * @param {sting} data hex
     * @returns string
     */
    decodeTohex(data) {
        return Buffer.from(data, 'hex').toString();
    }

}

let a = [
    "aes-128-cbc",
    "aes-128-cbc-hmac-sha1",
    "aes-128-cbc-hmac-sha256",
    "aes-128-ccm",
    "aes-128-cfb",
    "aes-128-cfb1",
    "aes-128-cfb8",
    "aes-128-ctr",
    "aes-128-ecb",
    "aes-128-gcm",
    "aes-128-ocb",
    "aes-128-ofb",
    "aes-128-xts",

    "aes-192-cbc",
    "aes-192-ccm",
    "aes-192-cfb",
    "aes-192-cfb1",
    "aes-192-cfb8",
    "aes-192-ctr",
    "aes-192-ecb",
    "aes-192-gcm",
    "aes-192-ocb",
    "aes-192-ofb",

    "aes-256-cbc",
    "aes-256-cbc-hmac-sha1",
    "aes-256-cbc-hmac-sha256",
    "aes-256-ccm",
    "aes-256-cfb",
    "aes-256-cfb1",
    "aes-256-cfb8",
    "aes-256-ctr",
    "aes-256-ecb",
    "aes-256-gcm",
    "aes-256-ocb",
    "aes-256-ofb",
    "aes-256-xts",

    "aes128",
    "aes128-wrap",
    "aes192",
    "aes192-wrap",
    "aes256",
    "aes256-wrap",

    
    "aria-128-cbc",
    "aria-128-ccm",
    "aria-128-cfb",
    "aria-128-cfb1",
    "aria-128-cfb8",
    "aria-128-ctr",
    "aria-128-ecb",
    "aria-128-gcm",
    "aria-128-ofb",

    "aria-192-cbc",
    "aria-192-ccm",
    "aria-192-cfb",
    "aria-192-cfb1",
    "aria-192-cfb8",
    "aria-192-ctr",
    "aria-192-ecb",
    "aria-192-gcm",
    "aria-192-ofb",

    "aria-256-cbc",
    "aria-256-ccm",
    "aria-256-cfb",
    "aria-256-cfb1",
    "aria-256-cfb8",
    "aria-256-ctr",
    "aria-256-ecb",
    "aria-256-gcm",
    "aria-256-ofb",

    "aria128",
    "aria192",
    "aria256",

    "bf",
    "bf-cbc",
    "bf-cfb",
    "bf-ecb",
    "bf-ofb",

    "blowfish",

    "camellia-128-cbc",
    "camellia-128-cfb",
    "camellia-128-cfb1",
    "camellia-128-cfb8",
    "camellia-128-ctr",
    "camellia-128-ecb",
    "camellia-128-ofb",
    "camellia-192-cbc",
    "camellia-192-cfb",
    "camellia-192-cfb1",
    "camellia-192-cfb8",
    "camellia-192-ctr",
    "camellia-192-ecb",
    "camellia-192-ofb",
    "camellia-256-cbc",
    "camellia-256-cfb",
    "camellia-256-cfb1",
    "camellia-256-cfb8",
    "camellia-256-ctr",
    "camellia-256-ecb",
    "camellia-256-ofb",

    "camellia128",
    "camellia192",
    "camellia256",

    "cast",
    "cast-cbc",

    "cast5-cbc",
    "cast5-cfb",
    "cast5-ecb",
    "cast5-ofb",

    "chacha20",
    "chacha20-poly1305",

    "des",
    "des-cbc",
    "des-cfb",
    "des-cfb1",
    "des-cfb8",
    "des-ecb",

    "des-ede",
    "des-ede-cbc",
    "des-ede-cfb",
    "des-ede-ecb",
    "des-ede-ofb",

    "des3",
    "des3-wrap",

    "des-ede3",
    "des-ede3-cbc",
    "des-ede3-cfb",
    "des-ede3-cfb1",
    "des-ede3-cfb8",
    "des-ede3-ecb",
    "des-ede3-ofb",

    "des-ofb",


    "desx",
    "desx-cbc",

    "id-aes128-CCM",
    "id-aes128-GCM",
    "id-aes128-wrap",
    "id-aes128-wrap-pad",
    "id-aes192-CCM",
    "id-aes192-GCM",
    "id-aes192-wrap",
    "id-aes192-wrap-pad",
    "id-aes256-CCM",
    "id-aes256-GCM",
    "id-aes256-wrap",
    "id-aes256-wrap-pad",
    "id-smime-alg-CMS3DESwrap",

    "idea",
    "idea-cbc",
    "idea-cfb",
    "idea-ecb",
    "idea-ofb",

    "rc2",
    "rc2-128",
    "rc2-40",
    "rc2-40-cbc",
    "rc2-64",
    "rc2-64-cbc",
    "rc2-cbc",
    "rc2-cfb",
    "rc2-ecb",
    "rc2-ofb",

    "rc4",
    "rc4-40",
    "rc4-hmac-md5",

    "seed",
    "seed-cbc",
    "seed-cfb",
    "seed-ecb",
    "seed-ofb",

    "sm4",
    "sm4-cbc",
    "sm4-cfb",
    "sm4-ctr",
    "sm4-ecb",
    "sm4-ofb"
]

module.exports = CipherEngine;


/*
const getInfo = (mode) => {for (let x = 0; x < 4; x++) {let z = crypto.getCipherInfo(`aes-${ x === 0 ? 128 : x === 1 ? 192 : x === 2 ? 256 : x === 4 ? 512 : 0 }-${mode}`);if (z === undefined | z === "undefined") {console.log(`aes-${ x === 0 ? 128 : x === 1 ? 192 : x === 2 ? 256 : x === 3 ? 512 : 0 }-${mode} no exist`)}else {console.log(z);}}}
*/