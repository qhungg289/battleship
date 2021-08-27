import Gameboard from "../src/gameboard";

const testBoard = Gameboard();

describe("size of board is 10x10", () => {
	test("board height is 10", () => {
		expect(testBoard.board.length).toBe(10);
	});

	test("board width is 10", () => {
		expect(testBoard.board[0].length).toBe(10);
	});
});

describe("check ship position at specific coordinates", () => {
	testBoard.placeShip(2, 3, 3, "horizontal");
	test("cordinates of horizontal placed ship", () => {
		expect(testBoard.board[3][2]).not.toBeNull();
		expect(testBoard.board[3][3]).not.toBeNull();
		expect(testBoard.board[3][4]).not.toBeNull();

		expect(testBoard.board[3][2].partIndex).toEqual(0);
		expect(testBoard.board[3][3].partIndex).toEqual(1);
		expect(testBoard.board[3][4].partIndex).toEqual(2);

		expect(testBoard.board[3][2].ship.shipParts).toEqual([false, false, false]);
		expect(testBoard.board[3][3].ship.shipParts).toEqual([false, false, false]);
		expect(testBoard.board[3][4].ship.shipParts).toEqual([false, false, false]);
	});

	testBoard.placeShip(6, 5, 4, "vertical");
	test.skip("cordinates of vertical placed ship", () => {
		expect(testBoard.board[5][6]).not.toBeNull();
		expect(testBoard.board[6][6]).not.toBeNull();
		expect(testBoard.board[7][6]).not.toBeNull();
		expect(testBoard.board[8][6]).not.toBeNull();

		expect(testBoard.board[5][6].partIndex).toEqual(0);
		expect(testBoard.board[6][6].partIndex).toEqual(1);
		expect(testBoard.board[7][6].partIndex).toEqual(2);
		expect(testBoard.board[8][6].partIndex).toEqual(3);

		expect(testBoard.board[5][6].ship.shipParts).toEqual([
			false,
			false,
			false,
			false,
		]);
		expect(testBoard.board[6][6].ship.shipParts).toEqual([
			false,
			false,
			false,
			false,
		]);
		expect(testBoard.board[7][6].ship.shipParts).toEqual([
			false,
			false,
			false,
			false,
		]);
		expect(testBoard.board[8][6].ship.shipParts).toEqual([
			false,
			false,
			false,
			false,
		]);
	});

	testBoard.placeShip(8, 0, 4, "horizontal");
	test("prevent board overflow horizontal", () => {
		expect(testBoard.board[0][8]).toBeNull();
		expect(testBoard.board[0][9]).toBeNull();
	});

	testBoard.placeShip(4, 5, 3, "horizontal");
	test("prevent ship overlap horizontal", () => {
		expect(testBoard.board[5][4]).toBeNull();
		expect(testBoard.board[5][5]).toBeNull();
		expect(testBoard.board[5][6]).not.toBeNull();
	});

	testBoard.placeShip(8, 2, 2, "horizontal");
	test("allow to place ship right at the edge horizontal", () => {
		expect(testBoard.board[2][8]).not.toBeNull();
		expect(testBoard.board[2][9]).not.toBeNull();
	});

	testBoard.placeShip(9, 7, 4, "vertical");
	test("prevent board overflow vertical", () => {
		expect(testBoard.board[7][9]).toBeNull();
		expect(testBoard.board[8][9]).toBeNull();
		expect(testBoard.board[9][9]).toBeNull();
	});

	testBoard.placeShip(2, 1, 4, "vertical");
	test("prevent ship overlap vertical", () => {
		expect(testBoard.board[1][2]).toBeNull();
		expect(testBoard.board[2][2]).toBeNull();
		expect(testBoard.board[3][2]).not.toBeNull();
		expect(testBoard.board[4][2]).toBeNull();
	});

	testBoard.placeShip(8, 8, 2, "vertical");
	test("allow to place ship right at the edge vertical", () => {
		expect(testBoard.board[8][8]).not.toBeNull();
		expect(testBoard.board[9][8]).not.toBeNull();
	});

	testBoard.receiveAttack(5, 1);
	testBoard.receiveAttack(1, 8);
	test("records the cordinates of the missed shot", () => {
		expect(testBoard.missedShot).toEqual([
			{ x: 5, y: 1 },
			{ x: 1, y: 8 },
		]);
	});

	testBoard.receiveAttack(6, 7);
	test("hit the correct ship", () => {
		expect(testBoard.board[5][6].ship.shipParts).toEqual([
			false,
			false,
			true,
			false,
		]);
		expect(testBoard.board[6][6].ship.shipParts).toEqual([
			false,
			false,
			true,
			false,
		]);
		expect(testBoard.board[7][6].ship.shipParts).toEqual([
			false,
			false,
			true,
			false,
		]);
		expect(testBoard.board[8][6].ship.shipParts).toEqual([
			false,
			false,
			true,
			false,
		]);
	});
});
