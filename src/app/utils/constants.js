const constants = {
  platform: process.platform,
  configFile: "settings.json",
  configUserFile: "config.json",
  backupFolder: "backups",
  accountsFolder: "accounts",
  databaseFile: "database.pmdb",
  usersDataBaseFile: "users.db",
  defaultConfig: {},
  databaseVesion: "1.0.0",
  configUser: {
    cryptography: {
      compressDataBeforeEncryption: true,
      encryptionType: "simetric",
      encryptionAlgorithm: "aes-256-cbc",
      keyDerivationAlgorithm: "pbkdf2",
      hmacAlgorithm: "sha256",
      useHmac: true,
      keySize: 32,
    },
    storage: {
      SaveConfigHashToDatabase: true,
      compressDataBase: true,
      saveMetadata: true,
    },
    userInterface: {
      developmentMode: false,
      theme: "light",
    },
  },
  path: {
    win32: "C:/ProgramData/Pass-Manager",
    linux: "/home/user/.config/Pass-Manager",
  }
};

module.exports = constants;