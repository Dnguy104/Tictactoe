"use strict";
//module for rendering board
const boardGame = (() => {
	let gameArray = ['','','','','','','','',''];
	const clear = () => {
		gameArray = ['','','','','','','','',''];
	};
	const render = (player) => {
		var gameBoard = document.getElementById('gameBoard');
		gameBoard.innerHTML = '';
		for(let i = 0; i < 9; i++) {
			gameBoard.innerHTML += `<div id='${i.toString()}'>${gameArray[i]}</div>`;
		}		
	};
	
	const markBoard = (position, mark) => {
		if(gameArray[position] == '') {
			gameArray[position] = mark;
			return true;
		}
		return false;

	};
	
	return {render, markBoard, clear}
})();


// factory for constructing players
const Player = (name, mark) => {
	let markedSpots = [];
	
	const markSpot = (spot) => {
		markedSpots.push(spot);	
	};
	
	const clearSpots = () => {
		markedSpots = [];
	};
	
	return {name, mark, markedSpots, markSpot, clearSpots};
};


//declaring the two player objects
let player1 = Player('player1', 'X');
let player2 = Player('player2', 'O');


// module for game logic
const gameLogic = (() => {
	let currentPlayer = player1;
	let moves = 1;
	let gameWon = false;
	let winningMarks = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
	
	const initButtons = () => {
		var gameBoard = document.getElementById('gameBoard');
		var children = gameBoard.childNodes;
		children.forEach((x) => {
			x.addEventListener('click', (event) => {
				let num = event.target.id;
				if(boardGame.markBoard(num, currentPlayer.mark)) {
					gameTurn();
				}	
			})
		});
	};
	
	const startGame = () => {
		boardGame.render(currentPlayer.mark);
	};
	
	const gameTurn = () => {
		console.log(currentPlayer.mark);
		boardGame.render(currentPlayer.mark);
		initButtons();
		if(currentPlayer == player1) currentPlayer = player2;
		else currentPlayer = player1;
	};
	
	return {startGame, initButtons};
})();
gameLogic.startGame();
gameLogic.initButtons();



