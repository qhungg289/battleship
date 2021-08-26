import Ship from "../src/ship";

describe("check ship status", () => {
	const newShip = Ship(3);

	test("is the ship get hit", () => {
		newShip.hit(2);
		expect(newShip.shipParts).toEqual([false, false, true]);
		expect(newShip.shipParts[2]).toBe(true);
	});

	test("is the ship sunk", () => {
		newShip.hit(0);
		newShip.hit(1);
		newShip.hit(2);
		expect(newShip.isSunk()).toBe(true);
	});
});
