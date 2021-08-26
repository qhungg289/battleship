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
	newBoard.placeShip(2, 3, 3, "horizontal");
	newBoard.placeShip(6, 5, 4, "vertical");

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
});
