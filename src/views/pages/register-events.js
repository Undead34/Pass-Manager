window.api.receive("account-register-response", (data) => {
  if (data.success) {
    window.location.href = "./login-view.html";
  } else {
    alert(data.error);
  }
});