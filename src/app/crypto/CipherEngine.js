const crypto = require("crypto");
const symmetric = require("./symmetric.json");
const random = require("./tools/random")

const generateIV = async () => {
    let buf = await random.autoRandomBytes(16)
    var ab = new ArrayBuffer(buf.bytes.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.bytes.length; ++i) {
        view[i] = buf.bytes[i];
    }
    return ab;
}

const getAlgorithmsSymmetric = (algorithm, mode, keySize) => {
    return algorithmsSymmetric[algorithm][keySize][mode];
}

const autoDeriveKeySymmetric = async () => {

}

const randomUUID = () => {
    return crypto.randomUUID();
}

/**
* encode data to hex
* @param {sting} data 
* @returns string
*/
const encodeTohex = (data) => {
    return Buffer.from(data).toString('hex');
}

/**
 * decode data to hex
 * @param {sting} data hex
 * @returns string
 */
const decodeTohex = (data) => {
    return Buffer.from(data, 'hex').toString();
}

random.autoRandomBytes(16).then((data) => {
    console.log(data.bytes)
});

module.exports = cipherEngine = {
    generateIV,
    getAlgorithmsSymmetric,
    autoDeriveKeySymmetric,
    randomUUID,
    encodeTohex,
    decodeTohex
};
