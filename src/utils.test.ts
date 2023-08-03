import { getBestMove } from "./utils";

describe("getBestMove", () => {
  const x = "X";
  const o = "O";
  const _ = null;
  test("mostly empty", () => {
    //prettier-ignore
    const board = [ x, x, _, 
                    o, o, _, 
                    _, _, _];
    const expected = 2;
    const result = getBestMove(board, x);
    expect(result).toEqual(expected);
  });
  test("let x win or o take win", () => {
    //prettier-ignore
    const board = [ x, o, o, 
                    x, x, o, 
                    _, x, _];
    const expected = 8;
    const result = getBestMove(board, o);
    expect(result).toEqual(expected);
  });
});
