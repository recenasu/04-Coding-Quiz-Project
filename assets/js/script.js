// Define variables
var timeEl = document.querySelector(".time");
var secondsLeft = 15;
var startButton = document.querySelector("#startQuiz");
var questionField = document.createElement("h4");
var answerList = document.createElement("ul");
var answer1Field = document.createElement("li");
var answer2Field = document.createElement("li");
var answer3Field = document.createElement("li");
var answer4Field = document.createElement("li");
var resultField = document.createElement("h4");



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

        // Display the quiz elements
        document.body.children[3].appendChild(questionField);
        document.body.children[3].appendChild(answerList);
        document.body.children[3].appendChild(answer1Field);
        document.body.children[3].appendChild(answer2Field);
        document.body.children[3].appendChild(answer3Field);
        document.body.children[3].appendChild(answer4Field);
        document.body.children[3].appendChild(resultField);

        questionField.textContent = "question";
        answerList.textContent = "Select one answer";
        answer1Field.textContent = "answer";
        answer2Field.textContent = "answer";
        answer3Field.textContent = "answer";
        answer4Field.textContent = "answer";

        answer1Field.addEventListener("click", wrongAnswer);
        answer2Field.addEventListener("click", rightAnswer);
        answer3Field.addEventListener("click", wrongAnswer);
        answer4Field.addEventListener("click", wrongAnswer);

    }, 1000)
}

function wrongAnswer() {
    resultField.textContent = "INCORRECT!";
    resultField.style.color = "red";
}

function rightAnswer() {
    resultField.textContent = "CORRECT!";
    resultField.style.color = "green";
}

// Display message when the timer in the setTime() function reaches 0, and change text color back to black.
function sendMessage() {
    timeEl.textContent = "Pencils down! Quiz over!";
    timeEl.style.color = "black";
}

// Start Quiz button event listener for launching the quiz
function startQuiz() {
    startButton.addEventListener("click", setTime);
}


startQuiz();





// ***This is all draft code***
// Question Objects

// var question1 = {
//     question: "words",
//     answer1: "words",
//     answer2: "words",
//     answer3: "words",
//     answer4: "words",
//     rightAnswer: "1"
// }

// var questionDisplayed = questionObject.question
// var answer1Displayed = questionObject.answer1
// var answer2Displayed = questionObject.answer2
// var answer3Displayed = questionObject.answer3
// var answer4Displayed = questionObject.answer4
// var correctAnswer = questionObject.rightAnswer;



// answer1Button.addEventListener("click", wrongAnswer);
// answer2Button.addEventListener("click", wrongAnswer);
// answer3Button.addEventListener("click", wrongAnswer);
// answer4Button.addEventListener("click", rightAnswer);

// create a for loop for cycling through the question objects
// for (i = 1; i < 11;)

//     function nextQuestion(objectName) {
//         questionDisplayed.text(objectName.question);
//     }

// function wrongAnswer() { }

// function rightAnswer() { }

// // ***End draft code***

