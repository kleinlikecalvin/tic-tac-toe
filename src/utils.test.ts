import { getBestMove } from "./utils";

const x = "X" as const;
const o = "O" as const;
const _ = null;

describe("getBestMove", () => {
  test("can make a winning move", () => {
    //prettier-ignore
    const board = [ x, x, _,
                    o, o, _,
                    _, _, _ ];
    const expected = 2;
    const result = getBestMove(board, x);
    expect(result).toEqual(expected);
  });
  test("can block a winning move", () => {
    //prettier-ignore
    const board = [ x, _, x, 
                    _, o, _, 
                    _, _, _ ];
    const expected = 8;
    const result = getBestMove(board, o);
    expect(result).toEqual(expected);
  });
});
