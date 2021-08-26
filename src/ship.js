function Ship(length) {
	let shipParts = [];

	for (let i = 0; i < length; i++) {
		shipParts.push(false);
	}

	function hit(part) {
		if (part >= length) return;
		shipParts[part] = true;
	}

	function isSunk() {
		return !shipParts.includes(false);
	}

	return { shipParts, hit, isSunk };
}

export default Ship;
