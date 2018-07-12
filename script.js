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
			gameBoard.innerHTML += `<div id='${i.toString()}'><div id='mark'>${gameArray[i]}</div></div>`;
		}		
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


// class for constructing players
class Player {

  constructor(name, mark) {
    
    this.markedSpots = [];
    this.mark = mark;
    this.name = name;
    
    return this;
  
  }
    
  markSpot(spot) {
    this.markedSpots.push(spot); 
  };

  clearSpots() {
    this.markedSpots = [];
  };
  
};


//declaring the two player objects
let player1 = new Player('Player 1', 'X');
let player2 = new Player('Player 2', 'O');


// module for game logic
const gameLogic = (() => {
	let currentPlayer = player1;
	let move = 1;
	let winningMarks = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
	
	const reset = () => {
		document.querySelector('h1').innerHTML = 'Tic-Tac-Toe!';
		boardGame.clear();
		player1.clearSpots();
		player2.clearSpots();
		currentPlayer = player1;
		move = 1;
		startGame();
	};
	
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
					currentPlayer.markSpot(parseInt(num));
					gameTurn();
				}	
			})
		});
		
		boardGame.highlightEmptyBlocks();
		
	};
	
	const startGame = () => {
		boardGame.render(currentPlayer.mark);
		document.querySelector('h2').style.display = 'block';
		document.getElementById('playAgain').style.display = 'none';
		initButtons();
	};
	
	const winCheck = () => {
		let ret = false;
		winningMarks.forEach((x) => {
			let num = x.filter(y => {return currentPlayer.markedSpots.includes(y);});
			if(num.length == x.length) {
				ret = true;
			}
		});
		
		return ret;
	};
	
	const displayWinner = () => {
		boardGame.render(currentPlayer.mark);
		document.querySelector('h1').innerHTML = currentPlayer.name + ' Wins!';
		
		document.querySelector('h2').style.display = 'none';
		document.getElementById('playAgain').style.display = 'block';
		
	};
	
	const displayDraw = () => {
		boardGame.render(currentPlayer.mark);
		document.querySelector('h1').innerHTML = ' Draw!';
		
		document.querySelector('h2').style.display = 'none';
		document.getElementById('playAgain').style.display = 'block';
	};
	
	const gameTurn = () => {
		
		if(winCheck()) {
			displayWinner();
			return true;
		}
		if(move == 9) {
			displayDraw();
			return true;
		}
		
		move++;
		if(currentPlayer == player1) currentPlayer = player2;
		else currentPlayer = player1;
		
		boardGame.render(currentPlayer.mark);
		initButtons();
	};
	
	return {startGame, reset};
})();

gameLogic.startGame();




