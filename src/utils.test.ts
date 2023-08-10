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
    const expected = 1;
    const result = getBestMove(board, o);
    expect(result).toEqual(expected);
  });
  test("prefer winning move to blocking move", () => {
    //prettier-ignore
    const board = [ x, o, x, 
                    _, o, _, 
                    x, _, _];
    const expected = 7;
    const result = getBestMove(board, o);
    expect(result).toEqual(expected);
  });
  test("chooses randomly when cannot decide", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);
    //prettier-ignore
    const board = [ x, _, _, 
                    _, _, _, 
                    _, _, _];
    const expected = 5;
    const result = getBestMove(board, o);
    expect(result).toEqual(expected);
  });
});
