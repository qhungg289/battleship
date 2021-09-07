import "./style.css";
import Gameboard from "./Gameboard";
import BotController from "./BotController";
import { initGame, renderBoards, resetBtn, startBtn, newGameBtn } from "./DOM";

let player = new Gameboard();
let bot = new BotController();

window.addEventListener("load", () => {
	initGame(player, bot);
	bot.autoPlaceShips();
});

resetBtn.addEventListener("click", () => {
	player = new Gameboard();
	bot = new BotController();
	initGame(player, bot);
	bot.autoPlaceShips();
});

newGameBtn.addEventListener("click", () => {
	player = new Gameboard();
	bot = new BotController();
	initGame(player, bot);
	bot.autoPlaceShips();
});

startBtn.addEventListener("click", () => {
	let shipCount = 0;
	for (let i = 0; i < player.board.length; i++) {
		for (let j = 0; j < player.board[i].length; j++) {
			if ("ship" in player.board[i][j] && "part" in player.board[i][j]) {
				shipCount++;
			}
		}
	}
	if (shipCount == 18) {
		renderBoards(player, bot);
	} else {
		alert("Don't have enough ships to start a new game!");
	}
});
