const getAccounts = async () => {
  let accounts = await window.api.invoke_2("get-accounts", null);
  document.getElementById("login-username").innerHTML = accounts.at(-1);
}

getAccounts();