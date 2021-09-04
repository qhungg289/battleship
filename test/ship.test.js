import Ship from "../src/ship";

describe("check ship status", () => {
	const testShip = new Ship(3);

	test("is the ship get hit", () => {
		testShip.hit(2);
		expect(testShip.shipParts).toEqual([false, false, true]);
		expect(testShip.shipParts[2]).toBe(true);
	});

	test("is the ship sunk", () => {
		testShip.hit(0);
		testShip.hit(1);
		testShip.hit(2);
		expect(testShip.isSunk()).toBe(true);
	});
});
