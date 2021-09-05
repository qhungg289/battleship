import Gameboard from "./Gameboard";

export default class BotController extends Gameboard {
	#alreadyHit = [];

	#coordinatesRandomizer() {
		const x = Math.floor(Math.random() * 10);
		const y = Math.floor(Math.random() * 10);
		return [x, y];
	}

	#orientationRandomizer() {
		const shipOrientations = ["vertical", "horizontal"];
		return shipOrientations[
			Math.floor(Math.random() * shipOrientations.length)
		];
	}

	autoAttack(player) {
		let [x, y] = this.#coordinatesRandomizer();
		while (
			this.#alreadyHit.some(
				(coordinate) => coordinate.x == x && coordinate.y == y
			)
		) {
			[x, y] = this.#coordinatesRandomizer();
		}
		player.receiveAttack(x, y);
		this.#alreadyHit.push({ x: x, y: y });
	}

	#autoPlaceShipsCells(shipLength) {
		let [x, y] = this.#coordinatesRandomizer();
		let orientation = this.#orientationRandomizer();
		try {
			if (orientation == "horizontal") {
				while (x + shipLength > 10) {
					[x, y] = this.#coordinatesRandomizer();
				}
				for (let i = 0; i < shipLength; i++) {
					while (
						this.board[y] == undefined ||
						this.board[y][x + i] == undefined ||
						"ship" in this.board[y][x + i] ||
						"part" in this.board[y][x + i]
					) {
						[x, y] = this.#coordinatesRandomizer();
					}
				}
				this.placeShip(x, y, shipLength, orientation);
			} else if (orientation == "vertical") {
				while (y + shipLength > 10) {
					[x, y] = this.#coordinatesRandomizer();
				}
				for (let i = 0; i < shipLength; i++) {
					while (
						this.board[y + i] == undefined ||
						this.board[y + i][x] == undefined ||
						"ship" in this.board[y + i][x] ||
						"part" in this.board[y + i][x]
					) {
						[x, y] = this.#coordinatesRandomizer();
					}
				}
				this.placeShip(x, y, shipLength, orientation);
			}
		} catch (error) {
			console.error(error);
			this.#autoPlaceShipsCells(shipLength);
		}
	}

	autoPlaceShips() {
		const shipUnits = [5, 4, 3, 2, 2, 1, 1];
		for (let i = 0; i < shipUnits.length; i++) {
			this.#autoPlaceShipsCells(shipUnits[i]);
		}
	}
}
