// Define variables
var timeEl = document.querySelector(".time");
var secondsLeft = 15;
var startButton = document.querySelector("#startQuiz");


// Quiz timer function.
function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        // Display countdown.
        timeEl.textContent = secondsLeft + " seconds remaining";

        // When the timer reaches < 10, change text to red.
        if (secondsLeft < 10) {
            timeEl.style.color = "red";
        }

        // When the timer reaches 0, execute the sendMessage function.
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }
        // Hide the Start Quiz button
        startButton.style.display = "none";
    }, 1000)
}

// Display message when the timer in the setTime() function reaches 0, and change text color back to black.
function sendMessage() {
    timeEl.textContent = "Pencils down! Quiz over!"
    timeEl.style.color = "black";
}

// Start Quiz button event listener for launching the quiz
function startQuiz() {
    startButton.addEventListener("click", setTime);
}


startQuiz();