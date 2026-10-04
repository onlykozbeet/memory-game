import { createDeck } from "./deck";
import { shuffle } from "../utils/shuffle";

export const createNewGame = () => ({
  cards: shuffle(createDeck()).map((card) => ({
    ...card,
    opened: false,
    matched: false,
  })),
  selected: [],
  moves: 0,
  pairsFound: 0,
  locked: false,
  finished: false,
});
