import { createNewGame } from "./game/game";
import { createGameView } from "./ui/view-layout";

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

  view = createGameView({ onNewGame: startNewGame, onOpenLeaderboard });
  view.mount(mount);
  view.render(state);
};
