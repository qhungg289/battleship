import Ship from "./ship";

function Gameboard() {
	let board = [];
	let missedShot = [];

	// Set width and height of the board then populate it with null values
	// // Height
	for (let i = 0; i < 10; i++) {
		board.push([]);
	}

	// // Width
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < 10; j++) {
			board[i].push(null);
		}
	}

	function placeShip(x, y, shipLength, orientation) {
		const ship = Ship(shipLength);
		if (orientation == "horizontal" && x + shipLength <= 10) {
			for (let i = 0; i < shipLength; i++) {
				if (board[y][x + i] != null) return;
			}
			for (let i = 0; i < shipLength; i++) {
				board[y][x + i] = { ship: ship, partIndex: i };
			}
		} else if (orientation == "vertical" && y + shipLength <= 10) {
			for (let i = 0; i < shipLength; i++) {
				if (board[y + i][x] != null) return;
			}
			for (let i = 0; i < shipLength; i++) {
				board[y + i][x] = { ship: ship, partIndex: i };
			}
		}
	}

	function receiveAttack(x, y) {
		if (board[y][x] != null) {
			board[y][x].ship.hit(board[y][x].partIndex);
		} else {
			missedShot.push({ x: x, y: y });
		}
	}

	function isAllSunk() {
		let filteredBoard = [];
		board.forEach((row) => {
			row.forEach((cell) => {
				if (cell != null) {
					filteredBoard.push(cell);
				}
			});
		});
		return filteredBoard.every((cell) => cell.ship.isSunk());
	}

	return { board, missedShot, placeShip, receiveAttack, isAllSunk };
}

export default Gameboard;
