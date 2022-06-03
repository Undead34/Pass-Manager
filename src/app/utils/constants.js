const path = require("path")

const appConstants = {
  appName: 'Kryptopass',
  appNameMachine: 'kryptopass',
  appVersion: '1.0.0',
  appDescription: 'Open source Password Manager',
  appAuthor: 'Undead34',
}

const databaseConstants = {
  databaseName: 'kryptopass',
  databaseVersion: '1.0.0',
  databaseExtension: 'kpdb',
  databaseCompressionExtension: 'kpdb.gz',
  databaseCompressionAlgorithm: 'gzip',
  databaseHeader: {
    "APP_VERSION": "TEXT",
    "DATA_BASE_VERSION": "TEXT",
    "USER_ID": "TEXT",
    "USER_NAME": "TEXT",
    "USER_KEY_HASH": "BLOB",
    "USER_KEY_SALT": "BLOB",
    "USER_KEY_IV": "BLOB",
    "KEY_LENGTH": "INTEGER",
    "KEY_DERIVATION_FUNCTION": "TEXT",
    "KEY_DERIVATION_PARAMETERS": "TEXT",
    "ALGORITHM": "TEXT",
    "ALGORITHM_PARAMETERS": "TEXT",
  },
  databaseCredentials: {
    "ID": "TEXT",
    "USERNAME_ELEMENT": "TEXT",
    "USERNAME_VALUE": "BLOB",
    "PASSWORD_ELEMENT": "TEXT",
    "PASSWORD_VALUE": "BLOB",
    "DATE_CREATED": "TEXT",
    "DATE_MODIFIED": "TEXT",
    "DATE_LAST_USED": "TEXT",
    "ORIGIN_URL": "BLOB",
    "ACTION_URL": "BLOB",
    "SUBMIT_ELEMENT": "TEXT",
    "ICON_URL": "BLOB",
    "TIMES_USED": "TEXT",
  }
}

const cipherConstants = {
  cipherName: 'aes-256-cbc',
  cipherKeyLength: 32,
  cipherSaltLength: 16,
  KDF: {
    "ARGON2": {
      hashLength: 32,
      timeCost: 3,
      memoryCost: 4096,
      
    }
  }
}

const userConstants = {
  theme: 'light',
  language: 'en',
}

const paths = {
  root: path.join(process.platform === 'win32' ? 'C:/' : '/', process.platform === 'win32' ? `/ProgramData/${appConstants.appName}` : process.platform === 'darwin' ? `/Applications/${appConstants.appName}.app` : `/usr/share/${appConstants.appName}`),
  database: path.join(path.join(process.platform === 'win32' ? 'C:/' : '/', process.platform === 'win32' ? `/ProgramData/${appConstants.appName}` : process.platform === 'darwin' ? `/Applications/${appConstants.appName}.app` : `/usr/share/${appConstants.appName}`), "accounts"),
}

const constants = {
  appConstants,
  databaseConstants,
  cipherConstants,
  userConstants,
  paths,
};

module.exports = constants;



/*

HEADER:
  ID: ACCOUNT_ID
  VERSION: 1.0.0
  DATABASE_VERSION: 1.0.0


  MASTER_KEY_HASH: HASH_OF_MASTER_KEY
  MASTER_KEY_SALT: SALT_OF_MASTER_KEY
  MASTER_KEY_KEY_DERIVATION_FUNCTION: PBKDF2, SCRYPT, ARGON2, etc
  MASTER_KEY_KEY_DERIVATION_CONFIG: CONFIG_OF_KEY_DERIVATION_FUNCTION

  MFA_CONFIG: JSON_OF_MFA_CONFIG

  HAS_A_PING: true/false
  PING_HASH: HASH_OF_PING
  PING_SALT: SALT_OF_PING
  PING_IV: IV_OF_PING
  PING_KEY_DERIVATION_FUNCTION: PBKDF2, SCRYPT, ARGON2, etc
  PING_KEY_DERIVATION_CONFIG: CONFIG_OF_KEY_DERIVATION_FUNCTION

  HAS_A_PASSPHRASE: true/false
  PASSPHRASE_HASH: HASH_OF_PASSPHRASE
  PASSPHRASE_SALT: SALT_OF_PASSPHRASE
  PASSPHRASE_IV: IV_OF_PASSPHRASE
  PASSPHRASE_KEY_DERIVATION_FUNCTION: PBKDF2, SCRYPT, ARGON2, etc
  PASSPHRASE_KEY_DERIVATION_CONFIG: CONFIG_OF_KEY_DERIVATION_FUNCTION

  ENCRYPTION_TYPE: simetric/asymetric
  ENCRYPTION_ALGORITHM: aes-256-cbc, aes-256-ctr, aes-256-gcm, etc
  KEY_DERIVATION_ALGORITHM: pbkdf2, scrypt, argon2, etc
  HMAC_ALGORITHM: sha256, sha512, etc
  USE_HMAC: true/false
  KEY_SIZE: 32, 64, 128, 256, etc
  KEY_DERIVATION_CONFIG: CONFIG_OF_KEY_DERIVATION_FUNCTION

  HAS_A_STORAGE_CONFIG: true/false
  COMPRESS_DATA_BEFORE_ENCRYPTION: true/false
  SAVE_METADATA: true/false
  SAVE_CONFIG_HASH_TO_DATABASE: true/false

  HAS_A_USER_INTERFACE_CONFIG: true/false
  DEVELOPMENT_MODE: true/false
  THEME: light/dark

  HAS_A_USER_CONFIG: true/false
  CRYPTOGRAPHY: JSON_OF_CRYPTOGRAPHY_CONFIG
  STORAGE: JSON_OF_STORAGE_CONFIG
  USER_INTERFACE: JSON_OF_USER_INTERFACE_CONFIG
  USER_CONFIG: JSON_OF_USER_CONFIG

  HAS_A_BACKUP: true/false
  BACKUP_HASH: HASH_OF_BACKUP
  BACKUP_SALT: SALT_OF_BACKUP
  BACKUP_IV: IV_OF_BACKUP
  BACKUP_KEY_DERIVATION_FUNCTION: PBKDF2, SCRYPT, ARGON2, etc
  BACKUP_KEY_DERIVATION_CONFIG: CONFIG_OF_KEY_DERIVATION_FUNCTION

  HAS_A_DATABASE: true/false
  DATABASE_HASH: HASH_OF_DATABASE
  DATABASE_SALT: SALT_OF_DATABASE
  DATABASE_IV: IV_OF_DATABASE
  DATABASE_KEY_DERIVATION_FUNCTION: PBKDF2, SCRYPT, ARGON2, etc
  DATABASE_KEY_DERIVATION_CONFIG: CONFIG_OF_KEY_DERIVATION_FUNCTION

  HAS_A_USERS_DATABASE: true/false
  USERS_DATABASE_HASH: HASH_OF_USERS_DATABASE
  USERS_DATABASE_SALT: SALT_OF_USERS_DATABASE
  USERS_DATABASE_IV: IV_OF_USERS_DATABASE
  USERS_DATABASE_KEY_DERIVATION_FUNCTION: PBKDF2, SCRYPT, ARGON2, etc
  USERS_DATABASE_KEY_DERIVATION_CONFIG: CONFIG_OF_KEY_DERIVATION_FUNCTION

  HAS_A_BACKUP_FOLDER: true/false
  BACKUP_FOLDER_HASH: HASH_OF_BACKUP_FOLDER
  BACKUP_FOLDER_SALT: SALT_OF_BACKUP_FOLDER

  HAS_A_ACCOUNTS_FOLDER: true/false
  ACCOUNTS_FOLDER_HASH: HASH_OF_ACCOUNTS_FOLDER
  ACCOUNTS_FOLDER_SALT: SALT_OF_ACCOUNTS_FOLDER



  platform: process.platform,
  configFile: "settings.json",
  configUserFile: "config.json",
  backupFolder: "backups",
  accountsFolder: "accounts",
  path: {
    win32: "C:/ProgramData/Pass-Manager",
    linux: "/home/user/.config/Pass-Manager",
  }


*/