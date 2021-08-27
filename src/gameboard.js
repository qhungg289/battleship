import Ship from "./ship";

function Gameboard() {
	let board = [];
	let isAllSunk = false;

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
		const newShip = Ship(shipLength);
		if (orientation == "horizontal" && x + shipLength <= 10) {
			for (let i = 0; i < shipLength; i++) {
				board[y][x] = newShip.shipParts[i];
				x++;
			}
		} else if (orientation == "vertical" && y + shipLength <= 10) {
			for (let i = 0; i < shipLength; i++) {
				board[y][x] = newShip.shipParts[i];
				y++;
			}
		}
	}

	return { board, isAllSunk, placeShip };
}

export default Gameboard;
