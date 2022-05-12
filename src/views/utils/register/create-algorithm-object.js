import algorithms from '../algorithms.json' assert { type: "json" };


const validateAlgorithm = (algorithm, mode, size) => {
  if (algorithms.hasOwnProperty(algorithm)) {
    if (algorithms[algorithm].hasOwnProperty(mode)) {
      if (algorithms[algorithm][mode].hasOwnProperty("keyLength")) {
        if (algorithms[algorithm][mode].keyLength.includes(size)) {
          return true;
        }
      }
    }
  }
  return false;
}

const createAlgorithmObject = (options) => {
  let algorithm = options.algorithm.toLocaleLowerCase();
  let mode = options.operationMode.toLocaleLowerCase();
  let size = parseInt(options.keySize);

  if (validateAlgorithm(algorithm, mode, size)) {
    return {
      algorithm: algorithm,
      mode: mode,
      keyLength: size,
      ivLength: algorithms[algorithm][mode].ivLength,
      name: `${algorithm}-${size}-${mode}`,
    }
  } else {
    return false;
  }
}

export { createAlgorithmObject };
