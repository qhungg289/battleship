let alreadyHit = [];

function coordinatesRandomizer() {
	const x = Math.floor(Math.random() * 10);
	const y = Math.floor(Math.random() * 10);
	return [x, y];
}

function autoAttack(player) {
	const [x, y] = coordinatesRandomizer();

	if (alreadyHit.some((coordinate) => coordinate.x == x && coordinate.y == y)) {
		autoAttack(player);
	} else {
		player.receiveAttack(x, y);
		alreadyHit.push({ x: x, y: y });
	}
}

function autoPlaceShipsCells(bot, length, orientation) {
	const [x, y] = coordinatesRandomizer();
	if (orientation == "horizontal" && x + length <= 10) {
		for (let i = 0; i < length; i++) {
			if ("ship" in bot.board[y][x + i] && "part" in bot.board[y][x + i]) {
				autoPlaceShipsCells(bot, length, orientation);
			}
		}
		bot.placeShip(x, y, length, orientation);
	} else if (orientation == "vertical" && y + length <= 10) {
		for (let i = 0; i < length; i++) {
			if ("ship" in bot.board[y + i][x] && "part" in bot.board[y + i][x]) {
				autoPlaceShipsCells(bot, length, orientation);
			}
		}
		bot.placeShip(x, y, length, orientation);
	} else {
		autoPlaceShipsCells(bot, length, orientation);
	}
}

function autoPlaceShips(bot) {
	const shipUnits = [5, 4, 3, 2, 2, 1, 1];
	const shipOrientations = ["vertical", "horizontal"];
	for (let i = 0; i < shipUnits.length; i++) {
		autoPlaceShipsCells(
			bot,
			shipUnits[i],
			shipOrientations[Math.floor(Math.random() * shipOrientations.length)]
		);
	}
}

export { autoAttack, autoPlaceShips };
