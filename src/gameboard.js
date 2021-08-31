import Ship from "./ship";

function Gameboard() {
	let board = [];
	let missedShot = [];

	for (let i = 0; i < 10; i++) {
		board.push([]);
	}

	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < 10; j++) {
			board[i].push(null);
		}
	}

	// Maybe the "hit" property is unnecessary?
	function placeShip(x, y, shipLength, orientation) {
		const ship = Ship(shipLength);
		if (orientation == "horizontal" && x + shipLength <= 10) {
			for (let i = 0; i < shipLength; i++) {
				if (board[y][x + i] != null) return;
			}
			for (let i = 0; i < shipLength; i++) {
				board[y][x + i] = { ship: ship, part: i, hit: false };
			}
		} else if (orientation == "vertical" && y + shipLength <= 10) {
			for (let i = 0; i < shipLength; i++) {
				if (board[y + i][x] != null) return;
			}
			for (let i = 0; i < shipLength; i++) {
				board[y + i][x] = { ship: ship, part: i, hit: false };
			}
		}
	}

	function receiveAttack(x, y) {
		if (board[y][x] != null) {
			board[y][x].ship.hit(board[y][x].part);
			board[y][x].hit = true;
		} else {
			missedShot.push({ x: x, y: y });
		}
	}

	function isAllSunk() {
		let occupiedCells = [];
		board.forEach((row) => {
			row.forEach((cell) => {
				if (cell != null) {
					occupiedCells.push(cell);
				}
			});
		});
		return occupiedCells.every((cell) => cell.ship.isSunk());
	}

	return { board, missedShot, placeShip, receiveAttack, isAllSunk };
}

export default Gameboard;
