import { createNewGame, resolveMismatch, openCard } from "./game/game";
import { createGameView } from "./ui/view-layout";

const DELAY = 1000;

export const createApp = (mount) => {
  let state = createNewGame();
  let view;
  let timer = null;

  const startNewGame = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    state = createNewGame();
    view.render(state);
  };

  const onOpenLeaderboard = () => {};

  const handleCardClick = (cardId) => {
    const previousState = state;
    const { state: nextState, outcome } = openCard(state, cardId);
    if (outcome === "ignored") return;

    state = nextState;
    view.render(state, previousState);

    if (outcome === "mismatched") {
      timer = setTimeout(() => {
        const lockedState = state;
        state = resolveMismatch(state);
        view.render(state, lockedState);
        timer = null;
      }, DELAY);
      return;
    }
  };

  view = createGameView({
    onNewGame: startNewGame,
    onOpenLeaderboard,
    onCardClick: handleCardClick,
  });
  view.mount(mount);
  view.render(state);
};
