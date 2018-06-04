var boardGame = (() => {
	var gameArray = [];
	var clear = () => {
		for(let i = 0; i < 9; i++) {
			gameArray.push('');
		}	
	};
	var render = () => {
		var gameBoard = document.getElementById('gameBoard');
		for(let i = 0; i < 9; i++) {
			var block = document.createElement('div');
			block.style.backgroundColor = '#d6d6d6';
			gameBoard.appendChild(block);
		}
	};
	var markBoard = (position, player) => {
		gameArray[position] = player;
		render();
	};
	var initButtons = (player) => {
		var gameBoard = document.getElementById('gameBoard');
		var children = gameBoard.childNodes;
		children.forEach((x) => {
			x.addEventListener('click', (event) => {
				if(gameArray(event.target.id) == '') {
					this.markBoard(event.target.id, player);
				}	
			})
		});
	};
	var gameChecker = () => {
		
	}
	
	
	render();	
	return {render}
})();

