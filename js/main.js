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
  
}