var timerElement = document.getElementById('timeLeft');
var startButton = document.getElementById('start');
var questionElement = document.getElementById('main');
var scoreElement = document.getElementById('main');
var initial = null;
console.log(startButton);

var timeLeft = 59;

var questions = [
    {
		question: 'What does DOM stand for?',
		a: 'Direct Operating Method',
		b: 'Document Object Model',
		c: 'Disabled Opening Manual',
		d: 'Document Opinionated Machine',
		answer: 'Document Object Model',
	},
	{
		question:
			'What is an Array',
		a: 'A data structure consisting of a collection of elements, each identified by at least one array index or key;',
		b: 'a water-dwelling mammal from Africa;',
		c: 'The flight velocity of an un-burdened swallow;',
		d: 'a laser-beam;',
		answer: 'A data structure consisting of a collection of elements, each identified by at least one array index or key;',
	},
	{
		question:
			'What is the most use-ful tip for using VS CODE',
		a: 'using git hub "code ."',
		b: 'keep your files organized',
		c: 'Turn on Auto-Save',
		d: 'Dont use it',
		answer: 'Turn on Auto-Save',
	},

];

questionindex = 0;

function startQuiz() {
	countdown();
	displayquestion();
}

function countdown() {
	var interval = setInterval(function () {
		if (questionindex < 3 && timeLeft > 0) {
			timerElement.textContent = 'Time: ' + timeLeft;
			timeLeft--;
		} else if (timeLeft === 1) {
			timerElement.textContent = 'Time: ' + timeLeft;
			timeLeft--;
		} else {
			timerElement.textContent = 'Time: ' + timeLeft;
			clearInterval(interval);
			score();
		}
	}, 1000);
}

function displayquestion() {
	if (questionindex < 4) {
		document.getElementById('main').innerHTML = '';

		var current = questions[questionindex];

		var question = document.createElement('h2');
		question.textContent = current.question;
		questionElement.appendChild(question);

		var a = document.createElement('p');
		a.textContent = current.a;
		questionElement.appendChild(a);

		var b = document.createElement('p');
		b.textContent = current.b;
		questionElement.appendChild(b);

		var c = document.createElement('p');
		c.textContent = current.c;
		questionElement.appendChild(c);

		var d = document.createElement('p');
		d.textContent = current.d;
		questionElement.appendChild(d);

		a.addEventListener('click', anwserCheck);
		b.addEventListener('click', anwserCheck);
		c.addEventListener('click', anwserCheck);
		d.addEventListener('click', anwserCheck);
	} else {
		score();
	}
}

function displayHighScores() {}

function anwserCheck() {
	console.log(this);
	if (questions[questionindex].answer === this.textContent) {
		console.log('correct');
		questionindex++;
		console.log(questionindex);
		displayquestion();
	} else {
		console.log('incorrect');
		questionindex++;
		console.log(questionindex);
		timeLeft -= 10;
		displayquestion();
	}
}

function score() {
	document.getElementById('main').innerHTML = '';

	var scoreText = document.createElement('h3');
	scoreText.innerHTML = 'Score: ' + timeLeft;
	scoreElement.appendChild(scoreText);
	if (timeLeft < 0) {
		scoreText.innerHTML = 'Score: 0';
		timeLeft = 0;
	}

	initial = document.createElement('input');
	scoreElement.appendChild(initial);

	var submit = document.createElement('button');
	submit.innerHTML = 'Submit';
	scoreElement.appendChild(submit);

	submit.onclick = saveScore;
}

function saveScore() {
	var userscore = {
		name: initial.value,
		fs: timeLeft,
	};
	highscores.push(userscore);
	window.localStorage.setItem('highscores', JSON.stringify(highscores));
	console.log('This is saved!');
	console.log(initial, timeLeft);
	document.getElementById('main').innerHTML = '';
	timeLeft = 55;
	questionindex = 0;
}

var viewscore = document.querySelector('.highScore');
viewscore.addEventListener('click', loadScore);
function loadScore() {
	for (var i = 0; i < highscores.length; i++) {
		var n = document.createElement('h4');

		var currentHighscore = highscores[i];

		n.textContent = currentHighscore.name + ' - ' + currentHighscore.fs;

		scoreElement.appendChild(n);
	}
}

var highscores = JSON.parse(localStorage.getItem('highscores')) || [];

startButton.onclick = startQuiz;