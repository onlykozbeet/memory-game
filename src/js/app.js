import { createNewGame, resolveMismatch, openCard } from "./game/game";
import { createGameView } from "./ui/view-layout";
import { openModal } from "./ui/modal-controller";
import { createLeaderboardContent, createWinContent } from "./ui/modal";
import { saveResult, loadResults } from "./storage/leaderboard";
import { checkPlural } from "./utils/helpers";

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

    if (outcome === "won") {
      saveResult(state.moves);
      openWinModal();
    }
  };

  const openWinModal = () => {
    openModal(({ close }) =>
      createWinContent({
        moves: state.moves,
        movesLabel: checkPlural(state.moves),
        onNewGame: startNewGame,
        close,
      })
    );
  };

  const openLeaderboardModal = () => {
    openModal(({ close }) =>
      createLeaderboardContent({ results: loadResults(), close })
    );
  };

  view = createGameView({
    onNewGame: startNewGame,
    onOpenLeaderboard: openLeaderboardModal,
    onCardClick: handleCardClick,
  });
  view.mount(mount);
  view.render(state);
};
