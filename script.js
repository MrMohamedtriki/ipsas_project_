var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowercase = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var symbols = "!@#$%^&*()_+-=[]{}";
function generatePassword() {
  var chars = "";
  if (document.getElementById("uppercase").checked) chars += uppercase;
  if (document.getElementById("lowercase").checked) chars += lowercase;
  if (document.getElementById("numbers").checked) chars += numbers;
  if (document.getElementById("symbols").checked) chars += symbols;
  if (chars === "") {
    document.getElementById("password-output").textContent = "Select at least one option!";
    return;
  }
  var length = parseInt(document.getElementById("length").value);
  var password = "";
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  document.getElementById("password-output").textContent = password;
}
function copyPassword() {
  var password = document.getElementById("password-output").textContent;
  if (password === "Your password will appear here" || password === "Select at least one option!") {
    return;
  }
  navigator.clipboard.writeText(password);
  document.getElementById("copy-btn").textContent = "Copied!";
  setTimeout(function () {
    document.getElementById("copy-btn").textContent = "Copy";
  }, 2000);
}
document.getElementById("generate-btn").addEventListener("click", generatePassword);
document.getElementById("copy-btn").addEventListener("click", copyPassword);
