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
                if (inputEl.value === "") {
                    timeEl.textContent = "Please enter text in the field";
                timeEl.style.color = "blue";
                } else {
                
                saveLastScore();
                document.body.children[4].removeChild(inputEl); document.body.children[4].removeChild(labelEl);
                document.body.children[4].removeChild(submitEl);
                document.body.children[4].appendChild(highScoreList);
                document.body.children[4].children[0].appendChild(highScore1);
                document.body.children[4].children[0].appendChild(highScore2);
                document.body.children[4].children[0].appendChild(highScore3);
                timeEl.textContent = "High Scores!!";
                timeEl.style.color = "black";
                renderScores();
                highScore1.textContent = highRecordedScore1.player + " got a " + highRecordedScore1.score;
                highScore2.textContent = highRecordedScore2.player + " got a " + highRecordedScore2.score;
                highScore3.textContent = highRecordedScore3.player + " got a " + highRecordedScore3.score;
                timeEl.style.color = "black";
                }
            })


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

// Configure the event listeners on the answers to perform the correct function when the right and wrong answers are selected
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
//    If nothing exists in local storage, add the last score to the scoresArray.
    if (localStorage.getItem("storedScores") === null) {
        scoresArray.unshift(lastScore);
        localStorage.setItem("storedScores", JSON.stringify(scoresArray));
    } else {
        // If scores exist in local storage, parse the stored data into the scoresArray, then add the last score to the scoresArray.
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


startQuiz();