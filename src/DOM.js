function initGame(player, bot) {
	const domGameboard1 = document.getElementById("gameboard-1");
	const domGameboard2 = document.getElementById("gameboard-2");
	domGameboard1.innerHTML = "";
	domGameboard2.innerHTML = "";

	if (player.isAllSunk()) {
		domGameboard2.classList.add("win");
		domGameboard1.classList.add("lose");
	} else if (bot.isAllSunk()) {
		domGameboard1.classList.add("win");
		domGameboard2.classList.add("lose");
	}

	for (let i = 0; i < player.board.length; i++) {
		for (let j = 0; j < player.board[i].length; j++) {
			const cell = document.createElement("button");
			cell.classList = "grid-cell-1";
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

			domGameboard1.appendChild(cell);
		}
	}

	for (let i = 0; i < bot.board.length; i++) {
		for (let j = 0; j < bot.board[i].length; j++) {
			const cell = document.createElement("button");
			cell.classList = "grid-cell-2";
			if (
				"ship" in bot.board[i][j] &&
				"part" in bot.board[i][j] &&
				bot.board[i][j].hit == false
			) {
				cell.classList.add("ship");
			} else if (
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
				initGame(player, bot);
			});

			domGameboard2.appendChild(cell);
		}
	}
}

const resetBtn = document.getElementById("reset-btn");

export { initGame, resetBtn };
