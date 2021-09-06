/**
 * When the document is fully loaded, initialise the page with the football quiz.
 * Add event listeners to all buttons to allow quiz category selection, answer
 * submission, and next question processing.
 */
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "nextQuestion") {
                displayNextQuestion();
            } else if (this.getAttribute("data-type") === "submitAnswer") {
		checkAnswer()
            } else {
                let quizType = this.getAttribute("data-type");
                runQuiz(quizType);
            }
        });
    }

    runQuiz("football");

});

function runQuiz(quizType) {
    alert("Running the " + quizType + " quiz!");
    document.getElementById("quizHeading").innerText = "The " + quizType + " Quiz";
    document.getElementById("questionNumber").innerText = "Question 0";
    document.getElementById("thisCorrectScore").innerText = "0";
    document.getElementById("thisIncorrectScore").innerText = "0";

    displayNextQuestion(quizType, 0);
}

function checkAnswer() {
    alert("Checking the answer 1.");
    let userAnswer = "XXX";
    let quizType = determineCurrentQuiz();
    let lastQuestionNumber = determineCurrentQuestion();
    let lastQuestionNumberIndex = parseInt(lastQuestionNumber) - 1;

    let possibleAnswers = document.getElementsByName("possibleAnswer");
    for (let i = 0; i < possibleAnswers.length; i++ ) {
        if (possibleAnswers[i].checked) {
            userAnswer = possibleAnswers[i].value;
            break;
        }
    }
    alert("The user answer is " + userAnswer);
    alert("The correct answer is " + quizzes[quizType][lastQuestionNumberIndex].rightAnswer );
    if (userAnswer === quizzes[quizType][lastQuestionNumberIndex].rightAnswer) {
        alert("Answer is correct!");
        updateScoreboard(true);
    }
    else {
        alert("Answer is incorrect!");
        updateScoreboard(false);
    }
    return false;
}

function displayNextQuestion() {
	alert("Displaying the next question.");
	let quizType = determineCurrentQuiz();
	let lastQuestionNumber = determineCurrentQuestion();
        alert("displayNextQuestion: " + quizType + " " + lastQuestionNumber);
	let nextQuestionNumber = parseInt(lastQuestionNumber) + 1;
	document.getElementById("questionNumber").innerText = "Question " + nextQuestionNumber.toString();
	let questionNumber = nextQuestionNumber - 1;

        let questionHTML = `<p>${quizzes[quizType][questionNumber].question}<p>
                            <input type="radio" id="option0" name="possibleAnswer" value="${quizzes[quizType][questionNumber].suggestedAnswers[0]}" required>
                            <label for="option0">${quizzes[quizType][questionNumber].suggestedAnswers[0]}</label><br>
                            <input type="radio" id="option1" name="possibleAnswer" value="${quizzes[quizType][questionNumber].suggestedAnswers[1]}">
                            <label for="option1">${quizzes[quizType][questionNumber].suggestedAnswers[1]}</label><br>
                            <input type="radio" id="option2" name="possibleAnswer" value="${quizzes[quizType][questionNumber].suggestedAnswers[2]}">
                            <label for="option2">${quizzes[quizType][questionNumber].suggestedAnswers[2]}</label><br>`;
	document.getElementById("displayQuestion").innerHTML = questionHTML;
	alert(questionHTML);
}

function updateScoreboard(correctAnswer) {
    alert("updateScoreboard");
    if (correctAnswer) {
        alert("updateScoreboard: correct start");
        let oldThisCorrectScore = parseInt(document.getElementById("thisCorrectScore").innerText);
        document.getElementById("thisCorrectScore").innerText = ++oldThisCorrectScore;
        let oldAllCorrectScore = parseInt(document.getElementById("allCorrectScore").innerText);
        document.getElementById("allCorrectScore").innerText = ++oldAllCorrectScore;
        alert("updateScoreboard: correct end");
    }
    else {
        alert("updateScoreboard: incorrect start");
        let oldThisIncorrectScore = parseInt(document.getElementById("thisIncorrectScore").innerText);
        document.getElementById("thisIncorrectScore").innerText = ++oldThisIncorrectScore;
        let oldAllIncorrectScore = parseInt(document.getElementById("allIncorrectScore").innerText);
        document.getElementById("allIncorrectScore").innerText = ++oldAllIncorrectScore;
        alert("updateScoreboard: incorrect end");
    }
    return false;
}

/**
 * Interrogate the DOM to find the current quiz type and determine the last question number
 * displayed to the user.
 */
function determineCurrentQuiz() {
    let quizTypeWords = document.getElementById("quizHeading").innerHTML.toLowerCase();
    let quizType = quizTypeWords.split(" ")[1];
    return quizType;
}

function determineCurrentQuestion() {
    let questionNumberWords = document.getElementById("questionNumber").innerHTML;
    let lastQuestionNumber = questionNumberWords.split(" ")[1];
    return lastQuestionNumber;
}

const quizzes = {
	football   : [{question: "F Who?", suggestedAnswers: ["Tom", "Dick", "Harry"], rightAnswer: "Dick"},
                      {question: "F Where?", suggestedAnswers: ["Peru", "Japan", "Korea"], rightAnswer: "Peru"},
                      {question: "F Why?", suggestedAnswers: ["Snow", "Crowd", "War"], rightAnswer: "Snow"}],
        history    : [{question: "H Who?", suggestedAnswers: ["Tom", "Dick", "Harry"], rightAnswer: "Dick"},
                      {question: "H Where?", suggestedAnswers: ["Peru", "Japan", "Korea"], rightAnswer: "Peru"},
                      {question: "H Why?", suggestedAnswers: ["Snow", "Crowd", "War"], rightAnswer: "Snow"}],
        literature : [{question: "L Who?", suggestedAnswers: ["Tom", "Dick", "Harry"], rightAnswer: "Dick"},
                      {question: "L Where?", suggestedAnswers: ["Peru", "Japan", "Korea"], rightAnswer: "Peru"},
                      {question: "L Why?", suggestedAnswers: ["Snow", "Crowd", "War"], rightAnswer: "Snow"}],
        science    : [{question: "S Who?", suggestedAnswers: ["Tom", "Dick", "Harry"], rightAnswer: "Dick"},
                      {question: "S Where?", suggestedAnswers: ["Peru", "Japan", "Korea"], rightAnswer: "Peru"},
                      {question: "S Why?", suggestedAnswers: ["Snow", "Crowd", "War"], rightAnswer: "Snow"}],
}
