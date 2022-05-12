window.onload = () => {
  window.api.send("PASSMANAGER::SHOW/HIDE", "show_app");
}

const WindowShow = () => {
  window.api.send("PASSMANAGER::SHOW/HIDE", "show");
}

const WindowHide = () => {
  window.api.send("PASSMANAGER::SHOW/HIDE", "hide");
}
