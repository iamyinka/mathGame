/*Onclick start/reset button
	If Playing,
		reload page
	If not playing,
		set Score to 0
		Show countdown box
		reduce time in loops by 1 sec
			Check if time left - timeleft?
				yes-> continue
			else?
				no-> game over
		Change button to reset
		Generate new questions & multiple answers


Onclick answers
	if playing,
		check if answer is correct
			yes?
				increase score by 1
				show correct box for 1 sec
				generate new question & answers
			wrong?
				show try again box for 1 sec
*/



var playing = false;
var score, action, timeRemainder;
var first = Math.round(Math.random() * 11);
var second = Math.round(Math.random() * 11);
var operator = "x";
var result;
var gameStart = document.getElementById('start');

gameStart.onclick = function gameStarted() {
	if(playing) {
		location.reload(); // Page Reload
	} else {
		playing = true;
		score = 0;
		timeRemainder = 60;
		hide("gameOver");
		document.getElementById("timeremainder").style.backgroundColor = "#54C4A5";
		document.getElementById("scoreValue").innerHTML = score;
		document.getElementById("timeRem").innerHTML = timeRemainder;
		show("timeremainder");
		gameStart.innerHTML = "<p>Reset Game</p>";
		
		startCountdown(); // Start Countdown
		
//		Generate Q & A
		result = generateQnA(first, second);
		
		document.getElementById("game-board").innerHTML = "<p>" + first + " " + operator + " " + second;
		
	}
};



// Start Countdown
function startCountdown() {
	action = setInterval(function() {
		timeRemainder -= 1;
		document.getElementById("timeRem").innerHTML = timeRemainder;
		if(timeRemainder <= 55) {
			document.getElementById("timeremainder").style.backgroundColor = "red";
		}; if(timeRemainder == 50) {
			stopCountdown();
			show("gameOver");
			document.getElementById("gameOver").innerHTML = "<p>Game Over!!!</p><p>Your Score is: " + score + ".</p>";
			hide("timeremainder");
			hide("correct");
			hide("wrong");
			playing = false;
			gameStart.innerHTML = "<p>Start Game</p>";
		}
	},1000);
}


//Stop Countdown
function stopCountdown() {
	clearInterval(action);
}


//Hide element
function hide(id) {
		document.getElementById(id).style.display = "none";
}

//SHow Element
function show(id) {
		document.getElementById(id).style.display = "block";
}

//		Generate Q & A
function generateQnA(first, second) {
	return first * second
}