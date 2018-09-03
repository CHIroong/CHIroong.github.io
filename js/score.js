let curr = parseInt(getCookie("current"));

window.onload = function() {
    console.log(curr);

    document.querySelector("input[type='hidden']").setAttribute("value", curr);
    if (curr == 59)
        window.location = "https://soundglance.github.io/end";
    updateCookie(curr + 1);
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

function updateCookie(i) {
    let expiredDate = new Date();
    expiredDate.setHours(expiredDate.getHours() + 3);
    document.cookie = "current=" + i + ";expires=" + expiredDate.toUTCString(); + "domain=soundglance.github.io;path=/";
}