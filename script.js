var boardGame = (() => {
	var gameArray = [];
	var clear = () => {
		for(let i = 0; i < 9; i++) {
			gameArray.push('');
		}	
	};
	var render = () => {
		var gameBoard = document.getElementById('gameBoard');
		gameBoard.innerHTML = '';
		for(let i = 0; i < 9; i++) {
			var block = document.createElement('div');
			block.innerHTML += gameArray[i];
			block.style.backgroundColor = '#d6d6d6';
			block.style.display = 'flex';
			block.style.justifyContent = "center";
			block.style.alignItems = "center";
			block.style.fontSize = "100px";
			
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
	
	clear();
	render();	
	return {render, markBoard}
})();

