const getAccounts = async () => {
  let accounts = await window.api.invoke_2("get-accounts", null);

  for (let  account = 0; account < accounts.length; account++ ) {
    document.getElementById("login-username").innerHTML += accounts[account];
    document.getElementById("login-username").append(document.createElement("br"));
  }
}

getAccounts();

document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  let loginPackage = {
    username: document.querySelector('#username').value,
    password: document.querySelector('#password').value
  }

  await window.api.invoke_2("account-login", loginPackage);
});