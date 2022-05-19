/**
 * PBKDF2 key derivation function algorithms simetric
 * @returns {Buffer} Buffer
 */
 const _pbkdf2Symmetric = async () => {
  try {
      const salt = await random.autoRandomBytes(16);
      if (salt.source === "anu-quantum-random") console.log("source: secure anu-quantum-random");
      let key = crypto.pbkdf2Sync(passphrase, salt.bytes, 100000, algorithm.keySize / 8, "sha512");
      return { key: key, salt: salt.bytes, kdf: "pbkdf2" };
  } catch (error) {
      console.log(error.message);
      return undefined;
  }
}