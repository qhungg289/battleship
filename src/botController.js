let alreadyHit = [];

function autoAttack(player) {
	const column = Math.floor(Math.random() * player.board.length);
	const row = Math.floor(Math.random() * player.board.length);

	if (alreadyHit.includes({ x: column, y: row })) {
		autoAttack(player);
	} else {
		player.receiveAttack(column, row);
		alreadyHit.push({ x: column, y: row });
	}
}

function autoPlaceShip(bot) {}

export { autoAttack, autoPlaceShip };
