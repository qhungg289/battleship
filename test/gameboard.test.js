import Gameboard from "../src/Gameboard";

const testBoard = new Gameboard();

describe("size of board is 10x10", () => {
	test("board height is 10", () => {
		expect(testBoard.board.length).toBe(10);
	});

	test("board width is 10", () => {
		expect(testBoard.board[0].length).toBe(10);
	});
});

describe("check ship at specific coordinates", () => {
	testBoard.placeShip(2, 3, 3, "horizontal");
	test("cordinates of horizontal placed ship", () => {
		for (let i = 0; i < 3; i++) {
			expect(testBoard.board[3][2 + i]).not.toEqual({ hit: false });
			expect(testBoard.board[3][2 + i].hit).toBeFalsy();
			expect(testBoard.board[3][2 + i].part).toBe(i);
			expect(testBoard.board[3][2 + i].ship.shipParts).toEqual([
				false,
				false,
				false,
			]);
		}
	});

	testBoard.placeShip(6, 5, 4, "vertical");
	test.skip("cordinates of vertical placed ship", () => {
		for (let i = 0; i < 4; i++) {
			expect(testBoard.board[5 + i][6]).not.toEqual({ hit: false });
			expect(testBoard.board[5 + i][6].hit).toBeFalsy();
			expect(testBoard.board[5 + i][6].part).toBe(i);
			expect(testBoard.board[5 + i][6].ship.shipParts).toEqual([
				false,
				false,
				false,
				false,
			]);
		}
	});

	testBoard.receiveAttack(6, 7);
	test("hit the correct ship", () => {
		for (let i = 0; i < 4; i++) {
			if (i != 2) {
				expect(testBoard.board[5 + i][6].ship.shipParts).toEqual([
					false,
					false,
					true,
					false,
				]);
				expect(testBoard.board[5 + i][6].hit).toBeFalsy();
			} else {
				expect(testBoard.board[5 + i][6].hit).toBeTruthy();
			}
		}
	});

	test("is all ships sunk", () => {
		const testBoard2 = new Gameboard();
		testBoard2.placeShip(3, 2, 2, "vertical");
		testBoard2.receiveAttack(3, 2);
		testBoard2.receiveAttack(3, 3);
		expect(testBoard2.isAllSunk()).toBe(true);
	});
});
