// change effect
function nextPage() {
  console.log("hi")
}

let curr = getCookie("current");

window.onload = function() {
    document.querySelector("iframe").setAttribute("src", localStorage.getItem("url" + curr))

    setTimeout(function() {
        window.location = "https://soundglance.github.io/score"
    }, 15000);
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