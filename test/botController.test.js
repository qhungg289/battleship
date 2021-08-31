import { autoAttack, autoPlaceShip } from "../src/botController";
import Gameboard from "../src/gameboard";

const player = Gameboard();
player.placeShip(8, 0, 1, "vertical");
player.placeShip(2, 1, 5, "vertical");
player.placeShip(4, 2, 3, "horizontal");
player.placeShip(7, 4, 2, "horizontal");
player.placeShip(5, 6, 4, "vertical");
player.placeShip(1, 8, 2, "horizontal");
player.placeShip(9, 9, 1, "vertical");

const bot = Gameboard();

test("able to make a random attack to player board", () => {
	autoAttack(player);

	let isShipGetHit = false;

	for (let i = 0; i < player.board.length; i++) {
		for (let j = 0; j < player.board[i].length; j++) {
			if (player.board[i][j].hit) {
				isShipGetHit = true;
				break;
			}
		}
	}

	expect(isShipGetHit).toBeTruthy();
});
