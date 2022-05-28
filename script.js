const blocksXblocks = [];

let snake = [];
snake[0] = {
	x: 4,
	y: 4,
};

let rowLength = Number(prompt('Enter size'))
let columnLength = rowLength;

const snakeSize = () => {
	for (let row = 0; row < rowLength; row++) {
		blocksXblocks.push(new Array(columnLength).fill(0))
	}
}
snakeSize()

let score = 0;
let food = {
	x: randomInteger(0, 9),
	y: randomInteger(0, 9),
};

let newHead;
let tailsAmount = 0;

document.body.onkeydown = function (e) {
	switch (e.keyCode) {
		case 87:
			direction = "up";
			break;
		case 68:
			direction = "right";
			break;
		case 83:
			direction = "down";
			break;
		case 65:
			direction = "left";
			break;
	}
}





function randomInteger(min, max) {
	let randomNum = min + Math.random() * (max + 1 - min);
	return Math.floor(randomNum);
}

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
	if (event.keyCode === 65 && dir != "right") {
		dir = "left";
	}
	else if (event.keyCode === 68 && dir != "left") {
		dir = "right";
	}
	else if (event.keyCode === 83 && dir != "up") {
		dir = "down";
	}
	else if (event.keyCode === 87 && dir != "down") {
		dir = "up";
	}
}

function getHTML() {
	document.getElementById('blocks_container').innerHTML = '';
	blocksXblocks.map((row, rowIdx) => {
		return document.getElementById('blocks_container').innerHTML += `
		<div class="row_container">
			${row.map((elem, elemIdx) => {
			if (rowIdx === snake[0].x && elemIdx === snake[0].y) {
				return `<div class="snake_head"></div>`
			}
			else if (rowIdx === food.x && elemIdx === food.y) {
				return `<div id="eat_block" class="eat_block"></div>`
			}
			for (i = 0; i < tailsAmount; i++) {
				if (snake[i] && snake[i].x === rowIdx && snake[i].y === elemIdx) {
					return `<div class="tail_block"></div>`
				}
			}
			if (snake[snake.length - 1] && snake[snake.length - 1].x === rowIdx && snake[snake.length - 1].y === elemIdx) {
				return `<div class="tail_block"></div>`
			}
			else if (elem === 0) {
				return `<div class="white_block"><div class="radius"></div></div>`
			}


		}).join(' ')}
		</div>`
	})
	document.getElementById('score_container').innerHTML = `<div class="score"><span><b>TOTAL SCORE: ${score}</b></span></div>`
}

function eatTail(head, arr) {
	for (let i = 0; i < arr.length; i++) {
		if (head.x === arr[i].x && head.y === arr[i].y) {
			clearInterval(game)
			alert("GAME OVER")
		}
	}
}

function drawGame() {
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (snakeX === food.x && snakeY === food.y) {
		score++;
		food = {
			x: randomInteger(0, rowLength - 1),
			y: randomInteger(0, columnLength - 1),
		};
		tailsAmount++;
		timeOutChanger()
	} else {
		snake.pop()
	}

	switch (dir) {
		case "right":
			snakeY++;
			break;
		case "left":
			snakeY--;
			break;
		case "up":
			snakeX--;
			break;
		case "down":
			snakeX++;
			break;
	}
	if (snakeY > columnLength - 1) {
		snakeY = 0;
	}
	if (snakeY < 0) {
		snakeY = columnLength - 1;
	}
	if (snakeX < 0) {
		snakeX = rowLength - 1;
	}
	if (snakeX > rowLength) {
		snakeX = 0;
	}
	newHead = {
		x: snakeX,
		y: snakeY,
	}
	eatTail(newHead, snake)
	snake.unshift(newHead)
	getHTML()
}
let intervalForTimeoutMS = 150;
let game = setInterval(drawGame, intervalForTimeoutMS)
function timeOutChanger() {
	if (score % 5 === 0 && score != 0) {
		if (intervalForTimeoutMS > 100) {
			clearInterval(game)
			intervalForTimeoutMS -= 10;
			game = setInterval(drawGame, intervalForTimeoutMS)
		}

	}
}

