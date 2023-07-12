// Define variables
var timeEl = document.querySelector(".time");
var secondsLeft = 60;


// Set the displayed time. When the timer reaches 0, execute the sendMessage function.
function setTime() {
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds remaining";
        
        if(secondsLeft===0){
            clearInterval(timerInterval);
            sendMessage();
        }
    }, 1000)
}

// Message to be displayed when the timer in the setTime() function reaches 0.
function sendMessage() {
    timeEl.textContent = "Pencils down! Quiz over!"
}

setTime();