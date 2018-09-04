// change effect
function nextPage() {
  console.log("hi")
}

let curr = getCookie("current");
let iframe = document.querySelector("iframe");
let sound = new Audio('audio/' + curr + '.mp3');
iframe.setAttribute("src", localStorage.getItem("url" + curr))

iframe.addEventListener("load", function() {
    setTimeout(function() {
        window.location = "https://soundglance.github.io/score"
    }, 15000);
});

window.addEventListener("keydown", function(e) {
    let obj = window.event? event : e;
    console.log(obj.keyCode + " pressed");
    if (obj.keyCode == 49) // TODO: select appropriate key binding
        sound.play();
    else if (obj.keyCode == 50)
        window.location = "https://soundglance.github.io/score";
})

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