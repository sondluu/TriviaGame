

// ************Game Start

$(document).ready(function(){
	// Create a function to create initial page when game starts, create a button class "start-button"
    function initialPage() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".playArea").html(startScreen);
}

initialPage();

// to show what is on page: main selector is element "body", child selector is element "start-button"

$("body").on("click", ".start-button", function(event){
	generateHTML();
	timer();
});
// child element "answer" is a class defined in the "generateHTML" function below.

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");
		clearInterval(theClock);
		winCount();
	}
	else {
		//alert("wrong answer!");
		clearInterval(theClock);
		lossCount();
	}
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
	resetGame();
}); // Closes reset-button click

}); // closing tag for document ready function 

// set all the variables involved

var questions = ["What is the capital of Australia?", "What is the capital of Liberia?", "What is the capital of Taiwan?", "What is the capital of Japan?", "What is the capital of China?", "What is the capital of Turkey?", "What is the capital of Colombia?", "What is the capital of India?"];
var answers = [["Canberra", "Melbourne", "Sydney", "Darwin"], ["Arthington","Monrovia","Tuzon","Marshall"], ["Tainan City", "Taichung", "Taipei", "Hsinchu"], ["Kyoto","Hiroshima","Tokyo","Osaka"], ["Hong Kong", "Macau", "Shanghai", "Beijing"], ["Ankara","Istanbul","Antalya","Bursa"], ["Medellin", "Bogota", "Cartagena", "Cali"], ["Mumbai","Hyderabad","Bangalore","New Delhi"]];
var correctAnswers = ["A. Canberra", "B. Monrovia", "C. Taipei", "C. Tokyo", "D. Beijing", "A. Ankara", "B. Bogota", "D. New Delhi"];
var correctCount = 0;
var wrongCount = 0;
var unanswered = 0;
var timeLeft = 15; 
var startScreen;
var gameHTML;
var theClock;
var seletedAnswer;


// a count down clock for 15 seconds

function timer() {
	theClock = setInterval(countDown, 1000);
	function countDown() {
		if (timeLeft === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (timeLeft > 0) {
			timeLeft--;
		}
		$(".timer").html(timeLeft);
	}
}
//
// questions appear

function generateHTML() {
	gameHTML = "<p class='timer-p'>Time Remaining: <span class='timer'>30</span></p><p>" + questions[questionCounter] + "</p><p class='first-answer answer'>A. " + answers[questionCounter][0] + "</p><p class='answer'>B. "+ answers[questionCounter][1]+"</p><p class='answer'>C. "+ answers[questionCounter][2]+"</p><p class='answer'>D. "+ answers[questionCounter][3]+"</p>";
	$(".playArea").html(gameHTML);
}

// Function to show for all that happens if an answer is wrong:

function lossCount() {
	wrongCount++;
	gameHTML = "<p class='timer-p'>Time Remaining: <span class='timer'>" + timeLeft + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>";
	$(".playArea").html(gameHTML);
	setTimeout(wait, 3000); //  3 seconds before new question appears.
}

// Function to show what happens if answer is correct:
function winCount() {
	correctCount++;
	gameHTML = "<p class='timer-p'>Time Remaining: <span class='timer'>" + timeLeft + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>";
	$(".playArea").html(gameHTML);
	setTimeout(wait, 3000); //  3 seconds before new question appears.
}

// Function to show what happened if question is unanswered and time runs out:
function generateLossDueToTimeOut() {
	unanswered++;
	gameHTML = "<p class='timer-p'>Time Remaining: <span class='timer'>" + timeLeft + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>";
	$(".playArea").html(gameHTML);
	setTimeout(wait, 3000);  //  3 seconds before new question appears.
}

//Restart game: 
function resetGame() {
	questionCounter = 0;
	correctCount = 0;
	wrongCount = 0;
	unanswered = 0;
	timeLeft = 15;
	generateHTML();
	timer();
}