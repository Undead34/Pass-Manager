function changeView(documentName, callback) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    document.getElementById("root").innerHTML = this.responseText;
    callback();
  }
  xhttp.open("GET", documentName, true);
  xhttp.send();
}

changeView("../pages/views/register.html", function () {
  const register = document.getElementById("register");
  register.innerHTML = "Hello World";
});



// PASSBOLT
// "Inter",Helvetica Neue,sans-serif
// BITWARDIEN
// -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"
// -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"
// SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace

// GOOGLE
// arial,sans-serif