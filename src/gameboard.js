import Ship from "./Ship";

export default class Gameboard {
	constructor() {
		this.board = [];
		for (let i = 0; i < 10; i++) {
			this.board.push([]);
		}

		for (let i = 0; i < this.board.length; i++) {
			for (let j = 0; j < 10; j++) {
				this.board[i].push({ hit: false });
			}
		}
	}

	placeShip(x, y, shipLength, orientation) {
		const ship = new Ship(shipLength);
		if (orientation == "horizontal" && x + shipLength <= 10) {
			for (let i = 0; i < shipLength; i++) {
				if ("ship" in this.board[y][x + i] && "part" in this.board[y][x + i])
					return;
			}
			for (let i = 0; i < shipLength; i++) {
				this.board[y][x + i] = { ship: ship, part: i, hit: false };
			}
		} else if (orientation == "vertical" && y + shipLength <= 10) {
			for (let i = 0; i < shipLength; i++) {
				if ("ship" in this.board[y + i][x] && "part" in this.board[y + i][x])
					return;
			}
			for (let i = 0; i < shipLength; i++) {
				this.board[y + i][x] = { ship: ship, part: i, hit: false };
			}
		}
	}

	receiveAttack(x, y) {
		if ("ship" in this.board[y][x] && "part" in this.board[y][x]) {
			this.board[y][x].ship.hit(this.board[y][x].part);
			this.board[y][x].hit = true;
		} else {
			this.board[y][x].hit = true;
		}
	}

	isAllSunk() {
		let occupiedCells = [];
		this.board.forEach((row) => {
			row.forEach((cell) => {
				if ("ship" in cell && "part" in cell) {
					occupiedCells.push(cell);
				}
			});
		});
		return occupiedCells.every((cell) => cell.ship.isSunk());
	}
}
