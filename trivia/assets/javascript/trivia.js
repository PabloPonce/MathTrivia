var gameData = [
		{question:'Whats 2 + 2 - 2?', 
		answer1:'Two', 
		answer2:'Twenty-two', 
		answer3:'Zero', 

		correctAnswer:'Two'},

		{question:'2 + 22 - 2', 
		answer1:'Two', 
		answer2:'Zero', 
		answer3:'Twenty-two', 

		correctAnswer:'Two'},

		{question:'2 + 2 - 2 - 2', 
		answer1:'Two', 
		answer2:'Twenty-two', 
		answer3:'Zero', 

		correctAnswer:'Zero'},
]


var randomQandA;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var newQandA;
var totalQuestions = 0;
var countdownTime;
var timeRemaining = 10;

$(document).ready(function(){
		
	$('#startButton').on('click', function(){

		getQandA();

	})

	$('#answer1').on('click', function(){

		var answer = $(this).html();
		checkAnswer(answer);

	})

	$('#answer2').on('click', function(){

		var answer = $(this).html();
		checkAnswer(answer);

	})

	$('#answer3').on('click', function(){

		var answer = $(this).html();
		checkAnswer(answer);

	})
	

})

function getQandA(){

	if (totalQuestions <= 3) {

		randomQandA = gameData[Math.floor(Math.random()*gameData.length)];
		$('#startButton').hide();

		timer();
		$('#timeRemaining').html('<h2>Time Remaining: ' + timeRemaining + '</h2>');
		clearPrompt();
		$('#question').html(randomQandA.question);
		$('#answer1').html(randomQandA.answer1);
		$('#answer2').html(randomQandA.answer2);
		$('#answer3').html(randomQandA.answer3);
		$('#answer4').html(randomQandA.answer4);
		clearInterval(newQandA);

	} else {

		$('#question').html('Here are your results');
		$('#prompt1').html('Incorrect Answers: ' + incorrectAnswers)
		$('#prompt2').html('Correct Answers: ' + correctAnswers)
		$('#prompt3').html('Unanswered: ' + unanswered)
		clearAnswer();	
		clearInterval(newQandA);
		createResetButton();


	}

}

function showNewQandA(){
	newQandA = setInterval(getQandA, 1000);
	timeRemaining = 10;
}

function countdown(){

	if (timeRemaining >= 0) {
		$('#timeRemaining').html('<h2>Time Remaining: ' + timeRemaining + '</h2>');
		timeRemaining-= 1;

	} else {

	clearInterval(countdownTime);
	unanswered++;
	totalQuestions++;
	$('#prompt1').html('You are out of time');
	$('#prompt2').html('The correct answer is ' + randomQandA.correctAnswer);
	clearAnswer();	
	showNewQandA();

	}	
}

function timer(){
	countdownTime = setInterval(countdown, 1000);
}

function resetGame(){

		correctAnswers = 0;
		incorrectAnswers = 0;
		unanswered = 0;
		totalQuestions = 0;
		getQandA();
		$('.resetButton').hide();
}

function createResetButton(){

	var x = $('<button>')
    x.addClass('resetButton');
    x.text('Start Over');
    $('#displayArea').append(x);

}

function checkAnswer(answer) {

	if (answer == randomQandA.correctAnswer) {

		clearInterval(countdownTime);
		correctAnswers++;
		totalQuestions++;
		console.log(totalQuestions);
		$('#prompt1').html('Correct');
		clearAnswer();	
		showNewQandA();

	} else {

		clearInterval(countdownTime);
		incorrectAnswers++;
		totalQuestions++;
		console.log(totalQuestions);
		$('#prompt1').html('Incorrect');
		$('#prompt2').html('The correct answer is ' + randomQandA.correctAnswer);
		clearAnswer();			
		showNewQandA();

	}
}

function clearAnswer(){

	$('#answer1').empty();
	$('#answer2').empty();			
	$('#answer3').empty();

}

function clearPrompt(){

	$('#prompt1').empty();
	$('#prompt2').empty();			
	$('#prompt3').empty();

}

$(document).on('click', '.resetButton', resetGame);



