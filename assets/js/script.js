// Define variables
var timeEl = document.querySelector(".time");
var secondsLeft = 60;
var startButton = document.querySelector("#startQuiz");
var questionField = document.createElement("h4");
var answerList = document.createElement("ul");
var answer1Field = document.createElement("li");
var answer2Field = document.createElement("li");
var answer3Field = document.createElement("li");
var answer4Field = document.createElement("li");
var resultField = document.createElement("h4");
var inputForm = document.createElement("div");
var labelEl = document.createElement("label");
var inputEl = document.createElement("input");
var submitEl = document.createElement("button");
var resetEl = document.createElement("button");
var highScoreList = document.createElement("ul");
var highScore1 = document.createElement("li");
var highScore2 = document.createElement("li");
var highScore3 = document.createElement("li");
var highScore4 = document.createElement("li");
var highScore5 = document.createElement("li");
var buttonContainer = document.createElement("div");
var rightAnswerKey = "";
var questionCounter = 0;
var finalScore = "";
var scoresArray = [];

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
    questionDisplayed: "What is JavaScript's primary role for a web page?",
    answerDisplayed1: "calculations and interactivity",
    answerDisplayed2: "formatting",
    answerDisplayed3: "colors",
    answerDisplayed4: "layout",
    correctAnswer: "1"
};

var question003 = {
    questionDisplayed: "What is not a js element?",
    answerDisplayed1: "h1",
    answerDisplayed2: "p",
    answerDisplayed3: "motivate",
    answerDisplayed4: "ul",
    correctAnswer: "3"
};

var question004 = {
    questionDisplayed: "Select one way js can be referenced in an HTML document?",
    answerDisplayed1: "print documents",
    answerDisplayed2: "referencing a separate.js file",
    answerDisplayed3: "Google",
    answerDisplayed4: "css",
    correctAnswer: "2"
};

var question005 = {
    questionDisplayed: "DOM stands for...",
    answerDisplayed1: "Direct Object Mode",
    answerDisplayed2: "Door Open Mode",
    answerDisplayed3: "Document Object Model",
    answerDisplayed4: "Drive On Mute",
    correctAnswer: "3"
};

var question006 = {
    questionDisplayed: "A for loop starts with which word?",
    answerDisplayed1: "for",
    answerDisplayed2: "let",
    answerDisplayed3: "div",
    answerDisplayed4: "var",
    correctAnswer: "1"
};

// Array variable containing the question bank objects.
var questionBank = [question001, question002, question003, question004, question005, question006];




// Quiz timer function.
function setTime() {

    // Hide the Start Quiz button
    // startButton.style.display = "none";
    document.body.children[2].remove(startButton);



    var timerInterval = setInterval(function () {
        secondsLeft--;
        // 
        if (questionCounter >= questionBank.length || secondsLeft <= 0) {
            // stop the timer
            clearInterval(timerInterval);
            // Display the final score
            timeEl.textContent = "Quiz over! \n Your final score is " + secondsLeft + "!!";
            timeEl.style.color = "black";
            // Remove the quiz elements
            document.body.children[2].remove(questionField);
            document.body.children[2].remove(answerList);
            document.body.children[2].remove(resultField);
            inputForm.className = "input-form";
            document.body.appendChild(inputForm);
            document.body.children[2].appendChild(labelEl);
            document.body.children[2].appendChild(inputEl);
            document.body.children[2].appendChild(submitEl);
            labelEl.textContent = "Enter your initials:";
            submitEl.textContent = "Submit";

            submitEl.addEventListener("click", function (event) {
                event.preventDefault();
                saveLastScore();
                document.body.appendChild(inputForm);
                document.body.children[2].remove(submitEl);
                document.body.children[1].appendChild(highScoreList);
                document.body.children[1].appendChild(highScore1);
                document.body.children[1].appendChild(highScore2);
                document.body.children[1].appendChild(highScore3);
                document.body.children[1].appendChild(highScore4);
                document.body.children[1].appendChild(highScore5);
                timeEl.textContent = "High Scores!!";
                timeEl.style.color = "black";
                renderScores();
                startButton.addEventListener("click", function (event) {
                    event.preventDefault();
                    startQuiz();
                })
            })

        } else {
            // Display countdown.
            timeEl.textContent = secondsLeft + " seconds remaining";
            // Display the quiz elements
            document.body.children[2].appendChild(questionField);
            document.body.children[2].appendChild(answerList);
            document.body.children[2].appendChild(answer1Field);
            document.body.children[2].appendChild(answer2Field);
            document.body.children[2].appendChild(answer3Field);
            document.body.children[2].appendChild(answer4Field);
            document.body.children[2].appendChild(resultField);

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

    if (questionBank[questionCounter] === undefined) {
        return;
    } else {
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
}

// Save the initials and last score to an object. 
function saveLastScore() {
    var lastScore = {
        player: inputEl.value,
        score: secondsLeft
    }
    if (localStorage.getItem("storedScores") === null) {
        scoresArray.push(lastScore);
        localStorage.setItem("storedScores", JSON.stringify(scoresArray));
    } else {
        scoresArray = JSON.parse(localStorage.getItem("storedScores"));
        scoresArray.push(lastScore);
        localStorage.setItem("storedScores", JSON.stringify(scoresArray));
    }
}

// Save the initials and last score to an object. 
function renderScores() {
    scoresArray = JSON.parse(localStorage.getItem("storedScores"));
    if (scoresArray.length > 4) {
        highScore1.textContent = scoresArray[0];
        highScore2.textContent = scoresArray[1];
        highScore3.textContent = scoresArray[2];
        highScore4.textContent = scoresArray[3];
        highScore5.textContent = scoresArray[4];
    } else if (scoresArray.length > 3) {
        highScore1.textContent = scoresArray[0];
        highScore2.textContent = scoresArray[1];
        highScore3.textContent = scoresArray[2];
        highScore4.textContent = scoresArray[3];
        highScore5.textContent = "none";
    } else if (scoresArray.length > 2) {
        highScore1.textContent = scoresArray[0];
        highScore2.textContent = scoresArray[1];
        highScore3.textContent = scoresArray[2];
        highScore4.textContent = "none";
        highScore5.textContent = "none";
    } else if (scoresArray.length > 1) {
        highScore1.textContent = scoresArray[0];
        highScore2.textContent = scoresArray[1];
        highScore3.textContent = "none";
        highScore4.textContent = "none";
        highScore5.textContent = "none";
    }
    else if (scoresArray.length > 0) {
        highScore1.textContent = scoresArray[0];
        highScore2.textContent = "none";
        highScore3.textContent = "none";
        highScore4.textContent = "none";
        highScore5.textContent = "none";
    }
}

    

// Start Quiz button event listener for launching the quiz
function startQuiz() {
    startButton.addEventListener("click", setTime);

}


startQuiz();