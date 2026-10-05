import { createLayout } from "./layout";
import { createCardElement, updateCardElement } from "./card";

export const createGameView = ({
  onNewGame,
  onOpenLeaderboard,
  onCardClick,
}) => {
  const { root, grid, movesValue, pairsValue } = createLayout({
    onNewGame,
    onOpenLeaderboard,
  });

  const updateCounters = (state) => {
    movesValue.textContent = String(state.moves).padStart(2, "0");
    pairsValue.textContent = String(state.pairsFound);
  };
  let cardElements = new Map();

  const renderBoard = (cards) => {
    cardElements = new Map(
      cards.map((card) => [
        card.id,
        createCardElement(card, () => onCardClick(card.id)),
      ])
    );
    grid.replaceChildren(...cardElements.values());
  };

  const updateBoard = (previousCards, cards) => {
    const previousById = new Map(previousCards.map((card) => [card.id, card]));

    for (const card of cards) {
      const previousCard = previousById.get(card.id);
      if (
        previousCard.opened !== card.opened ||
        previousCard.matched !== card.matched
      ) {
        updateCardElement(card, cardElements.get(card.id));
      }
    }
  };

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
