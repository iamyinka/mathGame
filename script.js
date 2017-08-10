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
var score, action, timeRemainder, result, x, y;
var operator = "x";
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
		generateQnA();
	}
};


//Click on answer boxes

for(i = 1; i < 5; i++) {
	document.getElementById("answer" + i).onclick = function() {
//	Check if playing
		if(playing) {
			if(this.innerHTML == result) {
				score ++;
				document.getElementById("scoreValue").innerHTML = score;

				show("correct");
				hide("wrong");
				setTimeout(function() {
					hide("correct");
				},1000);
				generateQnA();
			} 
			else {
				show("wrong");
				hide("correct");
				setTimeout(function() {
					hide("wrong");
				},1000);
			}
		}
	}
}



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
function generateQnA() {
	var x = 1 + Math.round(Math.random() * 9);
	var y = 1 + Math.round(Math.random() * 9);
	result = x * y;
	
	document.getElementById("game-board").innerHTML = "<p>" + x + " " + operator + " " + y + "</p>";
	
	var correctPosition = 1 + Math.round(Math.random() * 3);
	document.getElementById("answer" + correctPosition).innerHTML = "<p>" + result + "</p>";
	
//	fill other boxes with wrong answers
	var answers = [result];
	
	for(var i = 1; i < 5; i++ ) {
		if(i != correctPosition) {
			var wrongAnswer;
			do {
				wrongAnswer = (1 + Math.round(Math.random() * 9)) * (1 + Math.round(Math.random() * 9));
			} while (answers.indexOf(wrongAnswer) > -1)
			document.getElementById("answer" + i).innerHTML = "<p>" + wrongAnswer + "</p>";
			answers.push(wrongAnswer);
		}
	}
}