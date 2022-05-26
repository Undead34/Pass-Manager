const { writeFileSync } = require("fs");

module.exports = logger = {
  error: (err) => {
    writeFileSync("Errors.log", "\n"+err.toString(), { flag: "a" });
  },
  warn: (reason) => {
    writeFileSync("Warning.log", "\n"+reason.toString(), { flag: "a" });
  }
};