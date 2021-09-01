let alreadyHit = [];

function autoAttack(player) {
	let column = Math.floor(Math.random() * player.board.length);
	let row = Math.floor(Math.random() * player.board.length);

	if (
		alreadyHit.some(
			(coordinate) => coordinate.x == column && coordinate.y == row
		)
	) {
		autoAttack(player);
	} else {
		player.receiveAttack(column, row);
		alreadyHit.push({ x: column, y: row });
	}
}

function autoPlaceShip(bot) {}

export { autoAttack, autoPlaceShip };
