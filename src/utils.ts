import { Player } from "./types";
export function matches(a: Player, b: Player, c: Player) {
  if (a === null) return false;
  if (b !== a) return false;
  if (c !== b) return false;
  return a;
}
