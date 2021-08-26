import Ship from "./ship";

function Gameboard() {
	let board = [];

	// Set width and height of the board then populate it with null values
	for (let i = 0; i < 10; i++) {
		board.push([]);
	}

	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < 10; j++) {
			board[i].push(null);
		}
	}

	function placeShip(x, y, shipLength, orientation) {
		const newShip = Ship(shipLength);
		if (orientation == "horizontal") {
			for (let i = 0; i < newShip.shipParts.length; i++) {
				board[y][x] = newShip.shipParts[i];
				x++;
			}
		} else if (orientation == "vertical") {
			for (let i = 0; i < newShip.shipParts.length; i++) {
				board[y][x] = newShip.shipParts[i];
				y++;
			}
		}
	}

	return { board, placeShip };
}

export default Gameboard;
