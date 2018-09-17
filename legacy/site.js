let curr = getCookie("current");
let sound = new Audio('audio/' + curr + '.mp3');
let iframe = document.querySelector("iframe");
iframe.setAttribute("src", "/sites/" + curr + ".htm")

function scorePage(){
    window.location = "https://soundglance.github.io/score";
}

function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
};

bindEvent(iframe.contentWindow.document, 'keydown', function(e){
    e.stopPropagation();
    let obj = window.event? event : e;
    console.log(obj.keyCode + " pressed");

    if (obj.keyCode == 81) // TODO: select appropriate key binding
        sound.play();
    else if (obj.keyCode == 50)
        scorePage();
})

setTimeout(function() {
    window.location = "https://soundglance.github.io/score"
}, 30000);

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

/*

bindEvent(window, 'message', function(e){
    kiroong.innerHTML = e.data;
});

bindEvent(iframe.contentWindow, 'message', function(e){

    function bindEvent(element, eventName, eventHandler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, eventHandler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, eventHandler);
        }
    };

    var sendMessage = function (msg) {
        // Make sure you are sending a string, and to stringify JSON
        iframe.contentWindow.parent.postMessage(msg, '*');
    }

    iframe.contentWindow.document.getElementById("jaeyoon").innerHTML = "I RECEIVED"

    bindEvent(iframe.contentWindow.document.getElementById("jaeyoon"), 'click', function(){
        document.getElementById("kiroong").innerHTML = "UUHAHA"
    })

});

sendMessage("Hi")

*/
