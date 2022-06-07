const electron = require("electron");
const log = require('electron-log');
const path = require("path");

class LogServiceLocal {
  constructor(config) {
    this.config = config.config;
    console.log(this.config);
    this.level = ["silly", "info", "verbose", "warn", "debug"][this.config.log.level > 5  ? 5 : this.config.log.level < 0 ? 0 : this.config.log.level];
    this.show = typeof this.config.log.console === "boolean" ? this.config.log.console : true;
  }

  showDialog() {
    log.catchErrors({
      showDialog: true,
      onError(error) {
        electron.dialog.showMessageBox({
          title: 'An error occurred',
          message: error.message,
          detail: error.stack,
          type: 'error',
          buttons: ['Ignore', 'Report', 'Exit'],
        })
          .then((result) => {
            if (result.response === 1) {
              electron.shell.openExternal("https://github.com/Undead34/Pass-Manager/issues/new");
              return;
            }
            if (result.response === 2) {
              electron.app.quit();
            }
          });
      }
    });
  }

  init() {
    if (this.show) {
      this.showDialog();
    }
  }
}

module.exports = LogServiceLocal;
