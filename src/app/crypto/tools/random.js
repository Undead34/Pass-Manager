const { Buffer } = require("buffer")
const { net } = require('electron')
const crypto = require("crypto")
const util = require("util")

// Get data of API
const APIGet = async (uri) => {
  return new Promise((resolve, reject) => {
    const request = net.request(uri);

    request.on('response', (response) => {
      let data = "";
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => { resolve(data); return; });
    });

    request.on('error', (err) => { reject(err); return; });
    request.end();

    let timeout = setTimeout(() => {
      request.abort()
      resolve("timeout");
      clearTimeout(timeout);
    }, 1800);
  })
}

/**
 * To give greater security and entropy to the 100% random data, we disorder them with pseudo-random number.
*/
const _difusionBytes = (bytes) => {
  if (Buffer.isBuffer(bytes)) {
    let arrayA = [];
    for (let x = 0; x < bytes.length; x++) {
      arrayA.push(bytes[x]);
    }
    let arrayB = arrayA.sort(function (a, b) { return (Math.random() - 0.5) });
    let buf = Buffer.from(arrayB);
    return buf;
  } else {
    return false;
  }
}

/**
 * This website offers true random numbers to anyone on the internet. The random numbers are generated in real-time in our lab by measuring the quantum fluctuations of the vacuum. The vacuum is described very differently in the quantum physics and classical physics. In classical physics, a vacuum is considered as a space that is empty of matter or photons. Quantum physics however says that that same space resembles a sea of virtual particles appearing and disappearing all the time.
 * 
 * This is because the vacuum still possesses a zero-point energy. Consequently, the electromagnetic field of the vacuum exhibits random fluctuations in phase and amplitude at all frequencies. By carefully measuring these fluctuations, we are able to generate ultra-high bandwidth random numbers.
 * 
 * * Data type, the data type must be ‘uint8’ (returns integers between 0–255),
 * * ‘uint16’ (returns integers between 0–65535) or ‘hex16’ (returns hexadecimal characters between 00–ff).
 * 
 * * Array length, the length of the array to return. Must be between 1–1024.
 * 
 * * Block size, only needed for ‘hex16’ data type. Sets the length of each block. Must be between 1–1024.
 
 * @param {number} len 
 * @param {string} DataType 
 * @returns {Buffer} random bytes
*/

const anuQuantumRandomBytes = async (len, DataType = "hex16") => {
  let datatypes = ["uint8", "uint16", "hex16"]
  if (len !== undefined && len !== null && typeof len === "number" && typeof DataType === "string" && datatypes.includes(DataType)) {
    try {
      const API = `https://qrng.anu.edu.au/API/jsonI.php?length=1&type=${DataType}&size=${len}`;
      let response = await APIGet(API);

      if (response !== null && response !== "timeout" && response !== undefined && response !== "undefined") {
        let numbers = await JSON.parse(response.toString()).data[0]
        let coding = null;
        if (DataType === "hex16") { coding = "hex" }
        let numbersBuffer = Buffer.from(numbers, coding);
        return _difusionBytes(numbersBuffer);
      } else return null;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  } else { return null; }
}

/**
 * This function is a fusion of crypto.randomBytes() and anuQuantumRandomBytes() where, depending on whether the user has an internet connection or not, pseudo-random numbers or quantum numbers are used.
 * 
 * @param {number} len the len parameter is the length of bytes to return.
 * @return `Object` — pseudo-random or quantum-random bytes.
 */
const autoRandomBytes = async (len) => {
  return new Promise(async (resolve, reject) => {
    let anuQuantumRandomBytesBuf = await anuQuantumRandomBytes(len);
    if (anuQuantumRandomBytesBuf !== null) {
      resolve({ bytes: anuQuantumRandomBytesBuf, source: "anu-quantum-random" });
    }
    else {
      crypto.randomBytes(len, (err, buf) => {
        if (err) throw reject(err);
        resolve({ bytes: buf, source: "pseudo-random" });
      });
    }
  })
}

module.exports = random = {
  anuQuantumRandomBytes,
  autoRandomBytes
}