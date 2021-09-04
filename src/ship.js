export default class Ship {
	#length;
	constructor(length) {
		this.#length = length;
		this.shipParts = [];
		for (let i = 0; i < this.#length; i++) {
			this.shipParts.push(false);
		}
	}

	hit(part) {
		if (part >= this.#length) return;
		this.shipParts[part] = true;
	}

	isSunk() {
		return !this.shipParts.includes(false);
	}
}
