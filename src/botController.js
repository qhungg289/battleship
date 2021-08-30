let alreadyHit = [];

function autoAttack(player) {
	const column = Math.floor(Math.random() * player.board.length);
	const row = Math.floor(Math.random() * player.board.length);

	player.receiveAttack(column, row);
}

// TODO: implement this
function autoPlaceShip(bot) {}

export { autoAttack, autoPlaceShip };
