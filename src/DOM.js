const gameBoard1 = document.getElementById("gameboard-1");
const gameBoard2 = document.getElementById("gameboard-2");
const playArea = document.getElementById("play-area");
const controlArea = document.getElementById("control-area");
const resetBtn = document.getElementById("reset-btn");
const startBtn = document.getElementById("start-game-btn");
const rotateBtn = document.getElementById("rotate-btn");
const placeShip = document.getElementById("place-ship");
const orientationIndicator = document.getElementById("orientation-indicator");
const shipIndicator = document.getElementById("ship");
const endGameModal = document.getElementById("end-game");
const endGameMessage = document.getElementById("end-game-message");
const newGameBtn = document.getElementById("new-game-btn");

let index = 0;

rotateBtn.addEventListener("click", () => {
	if (orientationIndicator.dataset.orientation == "horizontal") {
		orientationIndicator.dataset.orientation = "vertical";
		orientationIndicator.innerText = "Vertical";
	} else {
		orientationIndicator.dataset.orientation = "horizontal";
		orientationIndicator.innerText = "Horizontal";
	}
});

resetBtn.addEventListener("click", () => {
	index = 0;
	placeShip.style.display = "flex";
	startBtn.style.display = "block";
	rotateBtn.style.display = "block";
	playArea.classList.remove("maximized");
	controlArea.classList.remove("minimized");
});

newGameBtn.addEventListener("click", () => {
	index = 0;
	placeShip.style.display = "flex";
	startBtn.style.display = "block";
	rotateBtn.style.display = "block";
	playArea.classList.remove("maximized");
	controlArea.classList.remove("minimized");
	endGameModal.style.display = "none";
});

function initGame(player, bot) {
	gameBoard1.innerHTML = "";
	gameBoard1.classList.remove("win");
	gameBoard1.classList.remove("lose");
	gameBoard2.innerHTML = "";
	gameBoard2.classList.remove("win");
	gameBoard2.classList.remove("lose");
	gameBoard2.style.display = "none";

	const shipUnits = [5, 4, 3, 2, 2, 1, 1];
	shipIndicator.innerHTML = "";
	for (let i = 0; i < shipUnits[index]; i++) {
		const cell = document.createElement("button");
		cell.classList = "grid-cell ship";
		shipIndicator.appendChild(cell);
	}
	if (index >= shipUnits.length) {
		placeShip.style.display = "none";
		rotateBtn.style.display = "none";
	}
	for (let i = 0; i < player.board.length; i++) {
		for (let j = 0; j < player.board[i].length; j++) {
			const cell = document.createElement("button");
			cell.classList = "grid-cell-player";
			if (
				"ship" in player.board[i][j] &&
				"part" in player.board[i][j] &&
				player.board[i][j].hit == false
			) {
				cell.classList.add("ship");
			}
			cell.addEventListener("click", () => {
				if (
					orientationIndicator.dataset.orientation == "horizontal" &&
					j + shipUnits[index] <= 10
				) {
					for (let x = 0; x < shipUnits[index]; x++) {
						if (
							"ship" in Object(player.board[i][j + x]) ||
							"part" in Object(player.board[i][j + x])
						) {
							return;
						}
					}
					if (index < shipUnits.length) {
						player.placeShip(
							j,
							i,
							shipUnits[index],
							orientationIndicator.dataset.orientation
						);
						index++;
						initGame(player, bot);
					}
				} else if (
					orientationIndicator.dataset.orientation == "vertical" &&
					i + shipUnits[index] <= 10
				) {
					for (let y = 0; y < shipUnits[index]; y++) {
						if (
							"ship" in Object(player.board[i + y][j]) ||
							"part" in Object(player.board[i + y][j])
						) {
							return;
						}
					}
					if (index < shipUnits.length) {
						player.placeShip(
							j,
							i,
							shipUnits[index],
							orientationIndicator.dataset.orientation
						);
						index++;
						initGame(player, bot);
					}
				}
			});
			gameBoard1.appendChild(cell);
		}
	}
}

function renderBoards(player, bot) {
	gameBoard1.innerHTML = "";
	gameBoard2.innerHTML = "";
	gameBoard2.style.display = "grid";
	startBtn.style.display = "none";
	playArea.classList.add("maximized");
	controlArea.classList.add("minimized");

	if (player.isAllSunk()) {
		gameBoard2.classList.add("win");
		gameBoard1.classList.add("lose");
		endGameMessage.innerHTML = "Computer win!";
		endGameModal.style.display = "block";
	} else if (bot.isAllSunk()) {
		gameBoard1.classList.add("win");
		gameBoard2.classList.add("lose");
		endGameMessage.innerHTML = "Player win!";
		endGameModal.style.display = "block";
	}
	for (let i = 0; i < player.board.length; i++) {
		for (let j = 0; j < player.board[i].length; j++) {
			const cell = document.createElement("button");
			cell.classList = "grid-cell";
			if (
				"ship" in player.board[i][j] &&
				"part" in player.board[i][j] &&
				player.board[i][j].hit == false
			) {
				cell.classList.add("ship");
			} else if (
				"ship" in player.board[i][j] &&
				"part" in player.board[i][j] &&
				player.board[i][j].hit == true
			) {
				cell.classList.add("ship-hit");
			} else if (player.board[i][j].hit == true) {
				cell.classList.add("empty-hit");
			}
			gameBoard1.appendChild(cell);
		}
	}
	for (let i = 0; i < bot.board.length; i++) {
		for (let j = 0; j < bot.board[i].length; j++) {
			const cell = document.createElement("button");
			cell.classList = "grid-cell-enemy";
			if (
				"ship" in bot.board[i][j] &&
				"part" in bot.board[i][j] &&
				bot.board[i][j].hit == true
			) {
				cell.classList.add("ship-hit");
				cell.disabled = true;
			} else if (bot.board[i][j].hit == true) {
				cell.classList.add("empty-hit");
				cell.disabled = true;
			}
			cell.addEventListener("click", () => {
				bot.receiveAttack(j, i);
				bot.autoAttack(player);
				renderBoards(player, bot);
			});
			gameBoard2.appendChild(cell);
		}
	}
}

export { initGame, renderBoards, resetBtn, startBtn, newGameBtn };
