"use strict";
//module for rendering board
const boardGame = (() => {
	let gameArray = ['','','','','','','','',''];
	const clear = () => {
		gameArray = ['','','','','','','','',''];
	};
	const render = () => {
		var gameBoard = document.getElementById('gameBoard');
		gameBoard.innerHTML = '';
		for(let i = 0; i < 9; i++) {
			gameBoard.innerHTML += `<div id='${i.toString()}'>${gameArray[i]}</div>`;
		}
		initButtons();
		
	};
	
	const markBoard = (position, player) => {
		gameArray[position] = player;
		render();
	};
	
	const initButtons = (player) => {
		var gameBoard = document.getElementById('gameBoard');
		var children = gameBoard.childNodes;
		children.forEach((x) => {
			x.addEventListener('click', (event) => {
				let num = event.target.id;
				if(gameArray[num] == '') {
					markBoard(num, player);
				}	
			})
		});
	};
	
	return {render, markBoard, clear}
})();
boardGame.render();

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

let player1 = Player('player1', 'X');
let player2 = Player('player2', 'O');




