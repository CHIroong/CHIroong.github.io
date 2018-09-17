let state = "start"

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 25; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

console.log(makeid());

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function sendMessage(text){
  console.log(text)
  url = "/record?data=" + text
  httpGetAsync(url, function(){})
}

let play_audio = undefined;
function play(soundName){
  if(play_audio) play_audio.pause()
  play_audio = new Audio('audio/' + soundName)
  play_audio.play()
}

function playAndState(soundName, stateName){
  play(soundName)
  state = stateName
}

function stringEqual(a, b){return a.localeCompare(b) === 0;}

let ENTER = 13, SPACE = 32, KEY1 = 49, KEY2 = 50, KEY3 = 51, KEY4 = 52, KEY5 = 53;

let ID = makeid()
sendMessage("Experiment has start: " + ID)

function bindEvent(element, eventName, eventHandler) {
  if (element.addEventListener) {
      element.addEventListener(eventName, eventHandler, false);
  } else if (element.attachEvent) {
      element.attachEvent('on' + eventName, eventHandler);
  }
};

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        let temp = a[j];
        a[j] = a[i];
        a[i] = temp;
    }
    return a;
}

let sessionState = "";
let sessionInd = 0;
let sessionNumbers = [1, 2, 3, 4, 5, 6];
let sessionStimuli = [0, 1, 2, 3, 4, 5, 6, 7];
let sessionStimuliInd = 0;
let sessionOrder = ['SS', 'SG'];

let result = [ID]

shuffle(sessionNumbers); shuffle(sessionOrder);
sessionNumbers = [0].concat(sessionNumbers)

function sessionHandler(keyCode){
    let sessionNumber = sessionNumbers[sessionInd];
    let sessionType = sessionInd != 0 ? sessionOrder[Math.floor((sessionInd - 1) / 3)] : sessionOrder[0];
    let sessionStimuliNumber = sessionInd != 0 ? sessionStimuli[sessionStimuliInd] : sessionStimuliInd;
    if(stringEqual(sessionState, "")){
        shuffle(sessionStimuli);
        play('script_session_intro_' + sessionNumber + '.mp3');
        sessionState = "intro";
        sessionStimuliInd = 0;
    }
    else if(stringEqual(sessionState, "intro")){
        if(keyCode == ENTER){
            play(sessionType + '_' + sessionNumber + '_' + sessionStimuliNumber + '_ask.mp3');
            sessionState = "ask";
        }
        else if(keyCode == SPACE) play('script_session_intro_' + sessionNumber + '.mp3');
    }
    else if(stringEqual(sessionState, "ask")){
        if(keyCode == KEY1){ play("script_confirm_1.mp3"); sessionState = "confirm"; input = 1;}
        else if(keyCode == KEY2){ play("script_confirm_2.mp3"); sessionState = "confirm"; input = 2;}
        else if(keyCode == KEY3){ play("script_confirm_3.mp3"); sessionState = "confirm"; input = 3;}
        else if(keyCode == KEY4){ play("script_confirm_4.mp3"); sessionState = "confirm"; input = 4;}
        else if(keyCode == KEY5){ play("script_confirm_5.mp3"); sessionState = "confirm"; input = 5;}
        else if(keyCode == SPACE) play('script_ask_value.mp3');
    }
    else if(stringEqual(sessionState, "confirm")){
        if(keyCode == KEY1){ play("script_confirm_1.mp3"); sessionState = "confirm"; input = 1;}
        else if(keyCode == KEY2){ play("script_confirm_2.mp3"); sessionState = "confirm"; input = 2;}
        else if(keyCode == KEY3){ play("script_confirm_3.mp3"); sessionState = "confirm"; input = 3;}
        else if(keyCode == KEY4){ play("script_confirm_4.mp3"); sessionState = "confirm"; input = 4;}
        else if(keyCode == KEY5){ play("script_confirm_5.mp3"); sessionState = "confirm"; input = 5;}
        else if(keyCode == ENTER){
            result.push([sessionNumber, sessionStimuliNumber, sessionType, input]);
            sendMessage([ID, sessionNumber, sessionStimuliNumber, sessionType, input].toString());
            sessionStimuliInd += 1;
            if(sessionInd == 0) sessionType = sessionOrder[1];
            if((sessionNumber == 0 && sessionStimuliInd > 1) || sessionStimuliInd > 7){
                sessionState = "";
                sessionInd += 1
                if(sessionInd > 6){
                    state = "end";
                    sendMessage(JSON.stringify(result));
                    playAndState("script_end.mp3", "end");
                    return;
                }
                if(sessionNumber == 0){ playAndState("script_9.mp3", "script_9") }
                else{ play("script_session_start.mp3"); }
                return;
            }
            sessionState = "ask";
            sessionStimuliNumber = sessionInd != 0 ? sessionStimuli[sessionStimuliInd] : sessionStimuliInd;
            play(sessionType + '_' + sessionNumber + '_' + sessionStimuliNumber + '_ask.mp3');
        }
    }
}

bindEvent(document, 'keydown', function(e){
  e.stopPropagation();
  let obj = window.event? event : e;
  console.log(obj.keyCode + " pressed");

  if(stringEqual(state, "start")){
    if(obj.keyCode == ENTER) playAndState('script_1.mp3', 'script_1');
  }
  else if(stringEqual(state, "script_1")){
    if(obj.keyCode == ENTER) playAndState('script_2.mp3', 'script_2');
    else if(obj.keyCode == SPACE) play('script_1.mp3');
  }
  else if(stringEqual(state, "script_2")){
    if(obj.keyCode == ENTER) playAndState('script_3.mp3', 'script_3');
    else if(obj.keyCode == SPACE) play('script_2.mp3');
  }
  else if(stringEqual(state, "script_3")){
    if(obj.keyCode == ENTER) playAndState('script_4.mp3', 'script_4');
    else if(obj.keyCode == SPACE) play('script_3.mp3');
  }
  else if(stringEqual(state, "script_4")){
    if(obj.keyCode == ENTER) playAndState('script_5.mp3', 'script_5');
    else if(obj.keyCode == SPACE) play('script_4.mp3');
  }
  else if(stringEqual(state, "script_5")){
    if(obj.keyCode == ENTER) playAndState('script_6.mp3', 'script_6');
    else if(obj.keyCode == SPACE) play('script_5.mp3');
  }
  else if(stringEqual(state, "script_6")){
    if(obj.keyCode == ENTER) playAndState('script_7.mp3', 'script_7');
    else if(obj.keyCode == SPACE) play('script_6.mp3');
  }
  else if(stringEqual(state, "script_7")){
    if(obj.keyCode == ENTER) playAndState('script_8.mp3', 'script_8');
    else if(obj.keyCode == SPACE) play('script_7.mp3');
  }
  else if(stringEqual(state, "script_8")){
    if(obj.keyCode == ENTER){ sessionHandler(obj.keyCode); state ="session"; }
    else if(obj.keyCode == SPACE) play('script_8.mp3');
  }
  else if(stringEqual(state, "script_9")){
    if(obj.keyCode == ENTER){ sessionHandler(obj.keyCode); state ="session"; }
    else if(obj.keyCode == SPACE) play('script_8.mp3');
  }
  else if(stringEqual(state, "session")){
      sessionHandler(obj.keyCode);
  }
})


/*
const expiredDate = new Date();
expiredDate.setHours(expiredDate.getHours() + 3);

window.onload = function() {
  // save index as cookie
  updateCookie(0);
}

function updateCookie(i) {
    document.cookie = "current=" + i + ";expires=" + expiredDate.toUTCString(); + "domain=soundglance.github.io;path=/";
}
*/
