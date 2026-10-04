import { createLayout } from "./layout";

export const createGameView = ({ onNewGame, onOpenLeaderboard }) => {
  const { root, grid, movesValue, pairsValue } = createLayout({
    onNewGame,
    onOpenLeaderboard,
  });

  const updateCounters = (state) => {
    movesValue.textContent = String(state.moves).padStart(2, "0");
    pairsValue.textContent = String(state.pairsFound);
  };
  let cardElements = new Map();

  const renderBoard = () => {
    grid.replaceChildren(...cardElements.values());
  };

  // eslint-disable-next-line no-unused-vars
  const updateBoard = (previousCards, cards) => {};

  return {
    mount: (element) => element.append(root),
    render: (state, previousState) => {
      if (previousState) {
        updateBoard(previousState.cards, state.cards);
      } else {
        renderBoard(state.cards);
      }
      updateCounters(state);
    },
  };
};
