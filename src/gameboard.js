import Ship from "./ship";

function Gameboard() {
	let board = [];
	let isAllSunk = false;
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

	/* Each parts of a ship need to have an index so it can
	determine which part has been hit to respond correctly */
	function placeShip(x, y, shipLength, orientation) {
		const newShip = Ship(shipLength);
		if (orientation == "horizontal" && x + shipLength <= 10) {
			for (let i = 0; i < shipLength; i++) {
				if (board[y][x + i] != null) return;
			}
			for (let i = 0; i < shipLength; i++) {
				board[y][x] = newShip.shipParts[i]; // Change this
				x++;
			}
		} else if (orientation == "vertical" && y + shipLength <= 10) {
			for (let i = 0; i < shipLength; i++) {
				if (board[y + i][x] != null) return;
			}
			for (let i = 0; i < shipLength; i++) {
				board[y][x] = newShip.shipParts[i]; // And this
				y++;
			}
		}
	}

	function receiveAttack(x, y) {
		if (board[y][x] == null) {
			missedShot.push({ x: x, y: y });
		}
	}

	return { board, missedShot, isAllSunk, placeShip, receiveAttack };
}

export default Gameboard;
