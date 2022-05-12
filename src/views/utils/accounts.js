const createAccount = function (account) {
  window.api.invoke("PASSMANAGER::CreateAccount", account);
}

export { createAccount };