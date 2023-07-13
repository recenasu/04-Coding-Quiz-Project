// Define variables
var timeEl = document.querySelector(".time");
var secondsLeft = 35;
var startButton = document.querySelector("#startQuiz");
var questionField = document.createElement("h4");
var answerList = document.createElement("ul");
var answer1Field = document.createElement("li");
var answer2Field = document.createElement("li");
var answer3Field = document.createElement("li");
var answer4Field = document.createElement("li");
var resultField = document.createElement("h4");
var rightAnswerKey = "";
var questionCounter = 0;
var finalScore = "";

// Question bank. Each question object contains a question, answers, and the correct answer identified.
var question001 = {
    questionDisplayed: "What is your name?",
    answerDisplayed1: "Sir Lancelot",
    answerDisplayed2: "Sir Gawain",
    answerDisplayed3: "Sir Percival",
    answerDisplayed4: "Sir Robin",
    correctAnswer: "1"
};

var question002 = {
    questionDisplayed: "What is your quest?",
    answerDisplayed1: "To seek the grail",
    answerDisplayed2: "To rule all of Briton",
    answerDisplayed3: "To reach Camelot",
    answerDisplayed4: "To reach the Castle aaaaghhh",
    correctAnswer: "3"
};

var question003 = {
    questionDisplayed: "What is your favorite color?",
    answerDisplayed1: "Blue",
    answerDisplayed2: "No, yellow",
    answerDisplayed3: "Red",
    answerDisplayed4: "Green",
    correctAnswer: "2"
};

var question004 = {
    questionDisplayed: "What is your favorite car?",
    answerDisplayed1: "Blue",
    answerDisplayed2: "No, yellow",
    answerDisplayed3: "Red",
    answerDisplayed4: "Green",
    correctAnswer: "2"
};

var question005 = {
    questionDisplayed: "What is your favorite boat?",
    answerDisplayed1: "Blue",
    answerDisplayed2: "No, yellow",
    answerDisplayed3: "Red",
    answerDisplayed4: "Green",
    correctAnswer: "2"
};

var question006 = {
    questionDisplayed: "What is your favorite food?",
    answerDisplayed1: "Blue",
    answerDisplayed2: "No, yellow",
    answerDisplayed3: "Red",
    answerDisplayed4: "Green",
    correctAnswer: "2"
};

// Array variable containing the question bank objects.
var questionBank = [question001, question002, question003, question004, question005, question006];




// Quiz timer function.
function setTime() {

    // Hide the Start Quiz button
    startButton.style.display = "none";



    var timerInterval = setInterval(function () {
        secondsLeft--;

        if (questionCounter >= questionBank.length || secondsLeft <= 0) {
            // stop the timer
            clearInterval(timerInterval);
            // Display the final score
            timeEl.textContent = "Quiz over! \n Your final score is " + secondsLeft + "!!";
            timeEl.style.color = "black";
            // Remove the quiz elements
            document.body.children[3].remove(questionField);
            document.body.children[3].remove(answerList);
            document.body.children[3].remove(answer1Field);
            document.body.children[3].remove(answer2Field);
            document.body.children[3].remove(answer3Field);
            document.body.children[3].remove(answer4Field);
            document.body.children[3].remove(resultField);
            sendMessage();

        } else {
            // Display countdown.
            timeEl.textContent = secondsLeft + " seconds remaining";
            // Display the quiz elements
            document.body.children[3].appendChild(questionField);
            document.body.children[3].appendChild(answerList);
            document.body.children[3].appendChild(answer1Field);
            document.body.children[3].appendChild(answer2Field);
            document.body.children[3].appendChild(answer3Field);
            document.body.children[3].appendChild(answer4Field);
            document.body.children[3].appendChild(resultField);

            nextQuestion(questionCounter);

        }
        // When the timer reaches < 10, change text to red.
        if (secondsLeft < 10) {
            timeEl.style.color = "red";
        }

    }, 1000);


}

function setAnswers() {
    if (rightAnswerKey === "1") {
        answer1Field.addEventListener("click", rightAnswer);
        answer2Field.addEventListener("click", wrongAnswer);
        answer3Field.addEventListener("click", wrongAnswer);
        answer4Field.addEventListener("click", wrongAnswer);
    } else if (rightAnswerKey === "2") {
        answer1Field.addEventListener("click", wrongAnswer);
        answer2Field.addEventListener("click", rightAnswer);
        answer3Field.addEventListener("click", wrongAnswer);
        answer4Field.addEventListener("click", wrongAnswer);
    } else if (rightAnswerKey === "3") {
        answer1Field.addEventListener("click", wrongAnswer);
        answer2Field.addEventListener("click", wrongAnswer);
        answer3Field.addEventListener("click", rightAnswer);
        answer4Field.addEventListener("click", wrongAnswer);
    } else if (rightAnswerKey === "4") {
        answer1Field.addEventListener("click", wrongAnswer);
        answer2Field.addEventListener("click", wrongAnswer);
        answer3Field.addEventListener("click", wrongAnswer);
        answer4Field.addEventListener("click", rightAnswer);
    }

}


// Wrong answer actions. Display an "INCORRECT" message. Decrement timer as a penalty against the final score.
function wrongAnswer() {
    resultField.textContent = "INCORRECT!";
    resultField.style.color = "red";
    // Increment the question counter
    questionCounter++;
    // Decrement timer
    secondsLeft = secondsLeft - 10;
    nextQuestion(questionCounter);
}

function rightAnswer() {
    resultField.textContent = "CORRECT!";
    resultField.style.color = "green";
    // Increment the question counter
    questionCounter++;
    // Go to the next question
    nextQuestion(questionCounter);
}

function nextQuestion(questionCounter) {

    // Pull data from the next question object to populate the question and answer fields and obtain the right answer.
    questionField.textContent = questionBank[questionCounter].questionDisplayed;
    answerList.textContent = "Select one answer"
    answer1Field.textContent = questionBank[questionCounter].answerDisplayed1;
    answer2Field.textContent = questionBank[questionCounter].answerDisplayed2;
    answer3Field.textContent = questionBank[questionCounter].answerDisplayed3;
    answer4Field.textContent = questionBank[questionCounter].answerDisplayed4;
    rightAnswerKey = questionBank[questionCounter].correctAnswer;


    // Add event listeners for the answers to be selectable and execute either the wrongAnswer or rightAnswer function based on the value of the rightAnswerKey variable.
    setAnswers();
}

// Display message when the timer in the setTime() function reaches 0, and change text color back to black.
function sendMessage() {



}

// Start Quiz button event listener for launching the quiz
function startQuiz() {
    startButton.addEventListener("click", setTime);

}


startQuiz();