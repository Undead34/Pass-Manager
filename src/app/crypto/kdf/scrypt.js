/**
 * Scrypt key derivation function algorithms simetric
 * @returns {Buffer} Buffer
 */
 const _scryptSymmetric = async () => {
  try {
      const salt = await random.autoRandomBytes(16);
      if (salt.source === "anu-quantum-random") console.log("source: secure anu-quantum-random");
      let key = crypto.scryptSync(passphrase, salt.bytes, algorithm.keySize / 8);
      return { key: key, salt: salt.bytes, kdf: "scrypt" };
  } catch (error) {
      console.log(error.message);
      return undefined;
  }
}