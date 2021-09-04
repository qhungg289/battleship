import Gameboard from "./Gameboard";

export default class BotController extends Gameboard {
	#alreadyHit = [];
	#coordinatesRandomizer() {
		const x = Math.floor(Math.random() * 10);
		const y = Math.floor(Math.random() * 10);
		return [x, y];
	}
	autoAttack(player) {
		const [x, y] = this.#coordinatesRandomizer();
		if (
			this.#alreadyHit.some(
				(coordinate) => coordinate.x == x && coordinate.y == y
			)
		) {
			this.autoAttack(player);
		} else {
			player.receiveAttack(x, y);
			this.#alreadyHit.push({ x: x, y: y });
		}
	}
	#autoPlaceShipsCells(length, orientation) {
		const [x, y] = this.#coordinatesRandomizer();
		if (orientation == "horizontal" && x + length <= 10) {
			for (let i = 0; i < length; i++) {
				if ("ship" in this.board[y][x + i] && "part" in this.board[y][x + 1]) {
					this.#autoPlaceShipsCells(length, orientation);
				}
			}
			this.placeShip(x, y, length, orientation);
		} else if (orientation == "vertical" && y + length <= 10) {
			for (let i = 0; i < length; i++) {
				if ("ship" in this.board[y + i][x] && "part" in this.board[y + i][x]) {
					this.#autoPlaceShipsCells(length, orientation);
				}
			}
			this.placeShip(x, y, length, orientation);
		} else {
			this.#autoPlaceShipsCells(length, orientation);
		}
	}
	autoPlaceShips() {
		const shipUnits = [5, 4, 3, 2, 2, 1, 1];
		const shipOrientations = ["vertical", "horizontal"];
		for (let i = 0; i < shipUnits.length; i++) {
			this.#autoPlaceShipsCells(
				shipUnits[i],
				shipOrientations[Math.floor(Math.random() * shipOrientations.length)]
			);
		}
	}
}
