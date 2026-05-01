// Available characters
var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowercase = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var symbols = "!@#$%^&*()_+-=[]{}";
// Load history from local storage or start empty
var passwordHistory = JSON.parse(localStorage.getItem("passwordHistory")) || [];

var savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  document.getElementById("theme-toggle").textContent = "☀️";
}

window.onload = function() {
  if (passwordHistory.length > 0) {
    updateHistoryUI();
  }
};

function generatePassword() {
  var chars = "";
  // Check which boxes are ticked
  if (document.getElementById("uppercase").checked) chars += uppercase;
  if (document.getElementById("lowercase").checked) chars += lowercase;
  if (document.getElementById("numbers").checked) chars += numbers;
  if (document.getElementById("symbols").checked) chars += symbols;
  if (chars === "") {
    document.getElementById("password-output").textContent = "Select at least one option!";
    return;
  }
  var length = parseInt(document.getElementById("length").value);
  if (length < 8 || length > 40) {
    alert("Password length must be between 8 and 40.");
    return;
  }
  var password = "";
  // Build the password randomly
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  var output = document.getElementById("password-output");
  output.classList.remove("fade");
  void output.offsetWidth;
  output.classList.add("fade");
  output.textContent = password;
  showCrackTime(length, chars.length);
  addToHistory(password);
}
// Add new password to top of history list
function addToHistory(password) {
  passwordHistory.unshift(password);
  localStorage.setItem("passwordHistory", JSON.stringify(passwordHistory));
  updateHistoryUI();
}

// Draw the history list on screen
function updateHistoryUI() {
  var list = document.getElementById("history-list");
  list.innerHTML = "";
  document.getElementById("clear-btn").style.display = "inline-block";
  document.getElementById("download-btn").style.display = "inline-block";
  for (var i = 0; i < passwordHistory.length; i++) {
    var li = document.createElement("li");
    li.textContent = passwordHistory[i];
    li.addEventListener("click", function () {
      navigator.clipboard.writeText(this.textContent);
      var originalText = this.textContent;
      this.textContent = "Copied!";
      this.style.color = "#2ecc71";
      var self = this;
      setTimeout(function() {
        self.textContent = originalText;
        self.style.color = "";
      }, 800);
    });
    list.appendChild(li);
  }
}
// Guess how long to crack it
function showCrackTime(length, charsLength) {
  var combinations = Math.pow(charsLength, length);
  var seconds = combinations / 1e11; 
  var text = "Instant";
  if (seconds > 31536000) {
    var years = Math.floor(seconds / 31536000);
    text = years > 1000000 ? "Millions of years" : years + " years";
  } else if (seconds > 86400) {
    text = Math.floor(seconds / 86400) + " days";
  } else if (seconds > 3600) {
    text = Math.floor(seconds / 3600) + " hours";
  } else if (seconds > 60) {
    text = Math.floor(seconds / 60) + " minutes";
  } else if (seconds > 1) {
    text = Math.floor(seconds) + " seconds";
  }
  document.getElementById("crack-time").textContent = "Time to crack: " + text;
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

document.getElementById("clear-btn").addEventListener("click", function() {
  passwordHistory = [];
  localStorage.removeItem("passwordHistory");
  document.getElementById("history-list").innerHTML = "";
  this.style.display = "none";
  document.getElementById("download-btn").style.display = "none";
});

document.getElementById("download-btn").addEventListener("click", function() {
  if (passwordHistory.length === 0) return;
  var textToSave = passwordHistory.join("\n");
  var blob = new Blob([textToSave], { type: "text/plain" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "passwords.txt";
  a.click();
  URL.revokeObjectURL(a.href);
});

document.getElementById("theme-toggle").addEventListener("click", function() {
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")) {
    this.textContent = "☀️";
    localStorage.setItem("theme", "light");
  } else {
    this.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
});
