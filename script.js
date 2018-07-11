"use strict";
//module for rendering board
const boardGame = (() => {
	let gameArray = ['','','','','','','','',''];
	const clear = () => {
		gameArray = ['','','','','','','','',''];
	};
	const render = (player) => {
		let gameBoard = document.getElementById('gameBoard');
		gameBoard.innerHTML = '';
		for(let i = 0; i < 9; i++) {
			gameBoard.innerHTML += `<div id='${i.toString()}'>${gameArray[i]}</div>`;
		}
		highlightEmptyBlocks();		
	};
	
	const markBoard = (position, mark) => {
		if(gameArray[position] == '') {
			gameArray[position] = mark;
			return true;
		}
		return false;

	};
	
	const highlightEmptyBlocks = () => {
		let blocks = document.getElementById('gameBoard').childNodes;
		
		for(let i = 0; i < 9; i++) {
			if(gameArray[i] == '') {
				blocks[i].onmouseover = () => {
					blocks[i].style.backgroundColor = '#87dfff';
				};
				blocks[i].onmouseout = () => {
					blocks[i].style.backgroundColor = '#d6d6d6';
				};
			}
		}
	};
	
	return {render, highlightEmptyBlocks, markBoard, clear}
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
		//Print the current player to the screen
		//debugger;
		let currentPlayerPrint = document.querySelector('h2');
		currentPlayerPrint.innerHTML = currentPlayer.name;
		
		var gameBoard = document.getElementById('gameBoard');
		var children = gameBoard.childNodes;
		children.forEach((x) => {
			x.addEventListener('click', (event) => {
				let num = event.target.id;
				if(boardGame.markBoard(num, currentPlayer.mark)) {
					currentPlayer.markSpot(num);
					gameTurn();
				}	
			})
		});
		
	};
	
	const startGame = () => {
		boardGame.render(currentPlayer.mark);
		initButtons();
	};
	
	const winCheck = () => {
		winningMarks.forEach((x) => {
			if(x.diff(currentPlayer.markedSpots) == []) return true;
		});
		
		return false;
	};
	
	const displayWinner = () => {
		
	};
	
	const gameTurn = () => {
		if(currentPlayer == player1) currentPlayer = player2;
		else currentPlayer = player1;
		
		if(winCheck()) {
			displayWinner();
			return;
		}
		
		boardGame.render(currentPlayer.mark);
		initButtons();
	};
	
	return {startGame};
})();

gameLogic.startGame();




