import { createDeck, TOTAL_PAIRS } from "./deck";
import { shuffle } from "../utils/helpers";

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

export const resolveMismatch = (state) => ({
  ...state,
  cards: state.cards.map((card) =>
    state.selected.includes(card.id) ? { ...card, opened: false } : card
  ),
  selected: [],
  locked: false,
});

export const openCard = (state, cardId) => {
  if (state.locked || state.finished || state.selected.length === 2) {
    return { state, outcome: "ignored" };
  }

  const card = state.cards.find(({ id }) => id === cardId);
  if (card.opened || card.matched) return { state, outcome: "ignored" };

  const cards = state.cards.map((item) =>
    item.id === cardId ? { ...item, opened: true } : item
  );
  const selected = [...state.selected, cardId];

  if (selected.length < 2) {
    return { state: { ...state, cards, selected }, outcome: "opened" };
  }

  const [firstId, secondId] = selected;
  const first = cards.find(({ id }) => id === firstId);
  const second = cards.find(({ id }) => id === secondId);
  const moves = state.moves + 1;

  if (first.symbol === second.symbol) {
    const matchedCards = cards.map((item) =>
      item.id === firstId || item.id === secondId
        ? { ...item, matched: true }
        : item
    );
    const pairsFound = state.pairsFound + 1;
    const finished = pairsFound === TOTAL_PAIRS;

    return {
      state: {
        ...state,
        cards: matchedCards,
        selected: [],
        moves,
        pairsFound,
        finished,
      },
      outcome: finished ? "won" : "matched",
    };
  }

  return {
    state: { ...state, cards, selected, moves, locked: true },
    outcome: "mismatched",
  };
};
