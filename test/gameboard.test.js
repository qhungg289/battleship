import Gameboard from "../src/gameboard";

const newBoard = Gameboard();

describe("size of board is 10x10", () => {
	test("board height is 10", () => {
		expect(newBoard.board.length).toBe(10);
	});

	test("board width is 10", () => {
		expect(newBoard.board[0].length).toBe(10);
	});
});

describe("is it able to place ships at specific coordinates", () => {
	newBoard.placeShip(6, 5, 4, "vertical");
	newBoard.placeShip(2, 3, 3, "horizontal");

	test("cordinates of horizontal placed ship", () => {
		expect(newBoard.board[3][2]).not.toBeNull();
		expect(newBoard.board[3][3]).not.toBeNull();
		expect(newBoard.board[3][4]).not.toBeNull();
		expect(newBoard.board[3][2]).toBeFalsy();
		expect(newBoard.board[3][3]).toBeFalsy();
		expect(newBoard.board[3][4]).toBeFalsy();
	});

	test("cordinates of horizontal placed ship", () => {
		expect(newBoard.board[5][6]).not.toBeNull();
		expect(newBoard.board[6][6]).not.toBeNull();
		expect(newBoard.board[7][6]).not.toBeNull();
		expect(newBoard.board[8][6]).not.toBeNull();
		expect(newBoard.board[5][6]).toBeFalsy();
		expect(newBoard.board[6][6]).toBeFalsy();
		expect(newBoard.board[7][6]).toBeFalsy();
		expect(newBoard.board[8][6]).toBeFalsy();
	});

	newBoard.placeShip(8, 0, 4, "horizontal");
	newBoard.placeShip(8, 2, 2, "horizontal");

	test("prevent board overflow horizontal", () => {
		expect(newBoard.board[0][8]).toBeNull();
		expect(newBoard.board[0][9]).toBeNull();
	});

	test("allow to place ship right at the edge horizontal", () => {
		expect(newBoard.board[2][8]).not.toBeNull();
		expect(newBoard.board[2][9]).not.toBeNull();
	});

	newBoard.placeShip(9, 7, 4, "vertical");
	newBoard.placeShip(8, 8, 2, "vertical");

	test("prevent board overflow vertical", () => {
		expect(newBoard.board[7][9]).toBeNull();
		expect(newBoard.board[8][9]).toBeNull();
		expect(newBoard.board[9][9]).toBeNull();
	});

	test("allow to place ship right at the edge vertical", () => {
		expect(newBoard.board[8][8]).not.toBeNull();
		expect(newBoard.board[9][8]).not.toBeNull();
	});
});
