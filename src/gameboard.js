import Ship from "./ship";

function Gameboard() {
	let board = [];

	for (let i = 0; i < 10; i++) {
		board.push([]);
	}

	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < 10; j++) {
			board[i].push({ hit: false });
		}
	}

	function placeShip(x, y, shipLength, orientation) {
		const ship = Ship(shipLength);
		if (orientation == "horizontal" && x + shipLength <= 10) {
			for (let i = 0; i < shipLength; i++) {
				if ("ship" in board[y][x + i] && "part" in board[y][x + i]) return;
			}
			for (let i = 0; i < shipLength; i++) {
				board[y][x + i] = { ship: ship, part: i, hit: false };
			}
		} else if (orientation == "vertical" && y + shipLength <= 10) {
			for (let i = 0; i < shipLength; i++) {
				if ("ship" in board[y + i][x] && "part" in board[y + i][x]) return;
			}
			for (let i = 0; i < shipLength; i++) {
				board[y + i][x] = { ship: ship, part: i, hit: false };
			}
		}
	}

	function receiveAttack(x, y) {
		if ("ship" in board[y][x] && "part" in board[y][x]) {
			board[y][x].ship.hit(board[y][x].part);
			board[y][x].hit = true;
		} else {
			board[y][x].hit = true;
		}
	}

	function isAllSunk() {
		let occupiedCells = [];
		board.forEach((row) => {
			row.forEach((cell) => {
				if ("ship" in cell && "part" in cell) {
					occupiedCells.push(cell);
				}
			});
		});
		return occupiedCells.every((cell) => cell.ship.isSunk());
	}

	return { board, placeShip, receiveAttack, isAllSunk };
}

export default Gameboard;
