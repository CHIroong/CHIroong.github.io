const expiredDate = new Date();
expiredDate.setHours(expiredDate.getHours() + 3);

window.onload = function() {
  // save index as cookie
  updateCookie(0);
}

function updateCookie(i) {
    document.cookie = "current=" + i + ";expires=" + expiredDate.toUTCString(); + "domain=soundglance.github.io;path=/";
}
