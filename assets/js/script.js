// Define variables
var timeEl = document.querySelector(".time");
var secondsLeft = 60;
var startButton = document.querySelector("#startQuiz");
var qAndA = document.querySelector("#qAndA");
var questionField = document.createElement("h4");
var answerList = document.createElement("ul");
var answer1Field = document.createElement("li");
var answer2Field = document.createElement("li");
var answer3Field = document.createElement("li");
var answer4Field = document.createElement("li");
var resultField = document.createElement("h4");
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

// Question bank. Each question object contains a question, answers, and the number of the correct answer.
var question001 = {
    questionDisplayed: "What is a JavaScript function?",
    answerDisplayed1: "Add, Subtract, Multiply, Divide",
    answerDisplayed2: "The browser",
    answerDisplayed3: "Computer memory",
    answerDisplayed4: "A resusable block of code that performs specific tasks",
    correctAnswer: "4"
};

var question002 = {
    questionDisplayed: "What is JavaScript's primary role for a web page?",
    answerDisplayed1: "Calculations and interactivity",
    answerDisplayed2: "Formatting",
    answerDisplayed3: "Colors",
    answerDisplayed4: "Layout",
    correctAnswer: "1"
};

var question003 = {
    questionDisplayed: "What is not a js element?",
    answerDisplayed1: "h1",
    answerDisplayed2: "p",
    answerDisplayed3: "motorboat",
    answerDisplayed4: "ul",
    correctAnswer: "3"
};

var question004 = {
    questionDisplayed: "What is an array?",
    answerDisplayed1: "A color palette",
    answerDisplayed2: "A single variable used to store a set of data",
    answerDisplayed3: "A special kind of radar",
    answerDisplayed4: "The opposite of dis-array",
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

// Objects to hold top 3 high scores pulled from local storage.
var highRecordedScore1 = {
    player: "-",
    score: "-"
}

var highRecordedScore2 = {
    player: "-",
    score: "-"
}

var highRecordedScore3 = {
    player: "-",
    score: "-"
}

// Quiz timer function.
function setTime() {

    // Hide the Start Quiz button
    // startButton.style.display = "none";
    document.body.children[2].removeChild(startButton);

    // Timer interval function
    var timerInterval = setInterval(function () {
        secondsLeft--;
        // Conditions for stopping the timer and ending the quiz.
        if (questionCounter >= questionBank.length || secondsLeft <= 0) {
            // stop the timer
            clearInterval(timerInterval);
            // Display the final score
            timeEl.textContent = "Quiz over! \n Your final score is " + secondsLeft + "!!";
            timeEl.style.color = "black";
            // Remove the quiz elements
            document.body.children[3].removeChild(questionField);
            document.body.children[3].removeChild(answerList);
            document.body.children[3].removeChild(answer1Field);
            document.body.children[3].removeChild(answer2Field);
            document.body.children[3].removeChild(answer3Field);
            document.body.children[3].removeChild(answer4Field);
            document.body.children[3].removeChild(resultField);
            // Add elements for the player to enter their initials with a Submit button
            document.body.children[4].appendChild(labelEl);
            document.body.children[4].appendChild(inputEl);
            document.body.children[4].appendChild(submitEl);
            labelEl.textContent = "Enter your initials:";
            submitEl.textContent = "Submit";

            // When the Submit button is pressed, do the following:
            submitEl.addEventListener("click", function (event) {
                event.preventDefault();
                // If an invalid value was entered, notify the player.
                if (inputEl.value === "") {
                    timeEl.textContent = "Please enter text in the field";
                    timeEl.style.color = "blue";
                } else {
                    // If a valid value was entered, remove the intials entry items and add elements to display the last three scores in local storage.
                    saveLastScore();
                    document.body.children[4].removeChild(inputEl);
                    document.body.children[4].removeChild(labelEl);
                    document.body.children[4].removeChild(submitEl);
                    document.body.children[4].appendChild(highScoreList);
                    document.body.children[4].children[0].appendChild(highScore1);
                    document.body.children[4].children[0].appendChild(highScore2);
                    document.body.children[4].children[0].appendChild(highScore3);
                    timeEl.textContent = "High Scores!!";
                    timeEl.style.color = "black";
                    renderScores();
                    // Check that local storage has values to pull. If not, display "-----" for the 2nd and 3rd scores.
                    highScore1.textContent = highRecordedScore1.player + "   scored a   " + highRecordedScore1.score;
                    if (highRecordedScore2.player !== "-") {
                        highScore2.textContent = highRecordedScore2.player + "   scored a   " + highRecordedScore2.score;
                    } else {
                        highScore2.textContent = "-----";
                    }
                    if (highRecordedScore3.player !== "-") {
                        highScore3.textContent = highRecordedScore3.player + "   scored a   " + highRecordedScore3.score;
                    } else {
                        highScore3.textContent = "-----";
                    }
                }
            })

// Actions if conditions for stopping the timer are not met.
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

// Configure the event listeners on the answers to execute the correct function when the right and wrong answers are selected
function setAnswers() {
    answer1Field.addEventListener("click", checkAnswer1);
    answer2Field.addEventListener("click", checkAnswer2);
    answer3Field.addEventListener("click", checkAnswer3);
    answer4Field.addEventListener("click", checkAnswer4);
}

// For the next 4 functions below, check that the answer clicked on is the right one and display the appropriate message and carry out the appropriate actions.
function checkAnswer1() {
    if (rightAnswerKey === "1") {
        resultField.textContent = "CORRECT!";
        resultField.style.color = "green";
        // Increment the question counter
        questionCounter++;
        // Empty the rightAnswerKey variable.
        rightAnswerKey === "";
        // Go to the next question
        nextQuestion(questionCounter);
    } else {
        resultField.textContent = "INCORRECT!";
        resultField.style.color = "red";
        // Increment the question counter
        questionCounter++;
        // Decrement timer as a score penalty
        secondsLeft = secondsLeft - 10;
        // Empty the rightAnswerKey variable.
        rightAnswerKey === "";
        // Go to the next question
        nextQuestion(questionCounter);
    }
}

function checkAnswer2() {
    if (rightAnswerKey === "2") {
        resultField.textContent = "CORRECT!";
        resultField.style.color = "green";
        // Increment the question counter
        questionCounter++;
        // Empty the rightAnswerKey variable.
        rightAnswerKey === "";
        // Go to the next question
        nextQuestion(questionCounter);
    } else {
        resultField.textContent = "INCORRECT!";
        resultField.style.color = "red";
        // Increment the question counter
        questionCounter++;
        // Decrement timer as a score penalty
        secondsLeft = secondsLeft - 10;
        // Empty the rightAnswerKey variable.
        rightAnswerKey === "";
        // Go to the next question
        nextQuestion(questionCounter);
    }
}

function checkAnswer3() {
    if (rightAnswerKey === "3") {
        resultField.textContent = "CORRECT!";
        resultField.style.color = "green";
        // Increment the question counter
        questionCounter++;
        // Empty the rightAnswerKey variable.
        rightAnswerKey === "";
        // Go to the next question
        nextQuestion(questionCounter);
    } else {
        resultField.textContent = "INCORRECT!";
        resultField.style.color = "red";
        // Increment the question counter
        questionCounter++;
        // Decrement timer as a score penalty
        secondsLeft = secondsLeft - 10;
        // Empty the rightAnswerKey variable.
        rightAnswerKey === "";
        // Go to the next question
        nextQuestion(questionCounter);
    }
}

function checkAnswer4() {
    if (rightAnswerKey === "4") {
        resultField.textContent = "CORRECT!";
        resultField.style.color = "green";
        // Increment the question counter
        questionCounter++;
        // Empty the rightAnswerKey variable.
        rightAnswerKey === "";
        // Go to the next question
        nextQuestion(questionCounter);
    } else {
        resultField.textContent = "INCORRECT!";
        resultField.style.color = "red";
        // Increment the question counter
        questionCounter++;
        // Decrement timer as a score penalty
        secondsLeft = secondsLeft - 10;
        // Empty the rightAnswerKey variable.
        rightAnswerKey === "";
        // Go to the next question
        nextQuestion(questionCounter);
    }
}

// Actions to be taken when proceeding to the next question in the quiz.
function nextQuestion(questionCounter) {

    // Check if there is a next question to pull from the question bank. If not, do not proceed.
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
        player: inputEl.value.trim(),
        score: secondsLeft
    }
    //    If nothing exists in local storage, add the last score to the scoresArray.
    if (localStorage.getItem("storedScores") === null) {
        scoresArray.unshift(lastScore);
        localStorage.setItem("storedScores", JSON.stringify(scoresArray));
    } else {
        // If scores exist in local storage, parse the stored data into the scoresArray, then add the last score to the beginning of the scoresArray. Then stringify the changed array and store it in local storage.
        scoresArray = JSON.parse(localStorage.getItem("storedScores"));
        scoresArray.unshift(lastScore);
        localStorage.setItem("storedScores", JSON.stringify(scoresArray));
    }
}

// Pull the scores from local storage into the scoresArray, pull the objects from the array and assign them to variables. 
function renderScores() {
    scoresArray = JSON.parse(localStorage.getItem("storedScores"));
    if (scoresArray.length > 2) {
        highRecordedScore1 = scoresArray[0];
        highRecordedScore2 = scoresArray[1];
        highRecordedScore3 = scoresArray[2];
    } else if (scoresArray.length > 1) {
        highRecordedScore1 = scoresArray[0];
        highRecordedScore2 = scoresArray[1];
    }
    else if (scoresArray.length > 0) {
        highRecordedScore1 = scoresArray[0];

    }
}



// Start Quiz button event listener for launching the quiz
function startQuiz() {
    startButton.addEventListener("click", setTime);

}

// Configure the application for launch.
startQuiz();