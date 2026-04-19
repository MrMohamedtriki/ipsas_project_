var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowercase = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var symbols = "!@#$%^&*()_+-=[]{}";
var history = [];
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
  var output = document.getElementById("password-output");
  output.classList.remove("fade");
  void output.offsetWidth;
  output.classList.add("fade");
  output.textContent = password;
  showStrength(length, chars);
  addToHistory(password);
}
function addToHistory(password) {
  history.unshift(password);
  if (history.length > 5) history.pop();
  var list = document.getElementById("history-list");
  list.innerHTML = "";
  for (var i = 0; i < history.length; i++) {
    var li = document.createElement("li");
    li.textContent = history[i];
    li.addEventListener("click", function () {
      navigator.clipboard.writeText(this.textContent);
    });
    list.appendChild(li);
  }
}
function showStrength(length, chars) {
  var score = 0;
  if (length >= 8)  score++;
  if (length >= 14) score++;
  if (chars.length > 26) score++;
  if (chars.length > 60) score++;
  var bar  = document.getElementById("strength-bar");
  var text = document.getElementById("strength-text");
  if (score <= 1) {
    bar.style.width = "33%";
    bar.style.background = "#e74c3c";
    text.textContent = "Weak";
  } else if (score === 2 || score === 3) {
    bar.style.width = "66%";
    bar.style.background = "#f39c12";
    text.textContent = "Medium";
  } else {
    bar.style.width = "100%";
    bar.style.background = "#2ecc71";
    text.textContent = "Strong";
  }
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
