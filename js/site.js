// Instanciating a new countdown with all defaults
new Countdown();

// Set time
let start = new Date();
let end = start.setSeconds(start.getSeconds() + 15);

// Instanciating a custom countdown
let countdown = new Countdown({
    selector: '#timer',
    msgBefore: "새로고침해주세요",
    msgAfter: "",
    msgPattern: "{seconds} 초",
    dateStart: start,
    dateEnd: end,
    leadingZeros: true,
    onEnd: function() {
      nextPage();
    }
});

// change effect
function nextPage() {
  console.log("hi")
}

let curr = getCookie("current");

document.onload = function() {
    document.querySelector("iframe").setAttribute("src", localStorage.getItem("urls"))
}

let expiredDate = new Date();
expiredDate.setHours(expiredDate.getHours() + 2);



function updateCookie(i) {
    document.cookie = "current=" + i + ";expires=" + expiredDate.toUTCString(); + "domain=jisu.jaeyoon.io;path=/";
}

function getCookie(cookieName) {
  // Parse the cookie string to get the information I need
  var cookies = document.cookie;
  var cookieValue = "";
  cookies = cookies.split(";"); // cookies = ["username=j", "age=22"]
  for (var i = 0; i < cookies.length; i++) {
    var temp = cookies[i].split("="); // temp = ["username", "j"]
    if (temp[0].trim() == cookieName) {
      cookieValue = temp[1];
      break;
    }
  }
  return cookieValue;
}