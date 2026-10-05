import { createElement } from "../utils/dom";
import { formatDate } from "../utils/helpers";

const createCloseButton = (close) => {
  const button = createElement("button", {
    className: "button button--primary",
    attrs: { type: "button" },
    text: "Close",
  });
  button.addEventListener("click", close);
  return button;
};

const createModalActions = (...buttons) =>
  createElement("div", { className: "modal__actions" }, ...buttons);

const createWinMessage = ({ moves, movesLabel }) =>
  createElement("p", {
    className: "modal__text",
    text: `You found all pairs in ${moves} ${movesLabel}.`,
  });

export const createWinContent = ({ moves, movesLabel, onNewGame, close }) => {
  const newGameButton = createElement("button", {
    className: "button button--primary",
    attrs: { type: "button" },
    text: "New Game",
  });
  newGameButton.addEventListener("click", () => {
    close();
    onNewGame();
  });

  return createElement(
    "div",
    { className: "modal__content" },
    createElement("h2", { className: "modal__title", text: "You Won!" }),
    createWinMessage({ moves, movesLabel }),
    createModalActions(newGameButton, createCloseButton(close))
  );
};

const createLeaderboardHeader = () => {
  const headings = ["Rank", "Moves", "Date"].map((label) =>
    createElement("th", { text: label, attrs: { scope: "col" } })
  );
  return createElement("thead", {}, createElement("tr", {}, ...headings));
};

const createLeaderboardRow = (result, index) =>
  createElement(
    "tr",
    { className: "leaderboard__row" },
    createElement("td", {
      className: "leaderboard__place",
      text: String(index + 1),
    }),
    createElement("td", {
      className: "leaderboard__moves",
      text: String(result.moves),
    }),
    createElement("td", {
      className: "leaderboard__date",
      text: formatDate(result.playedAt),
    })
  );

const createLeaderboardTable = (results) => {
  const rows = results.map(createLeaderboardRow);
  const body = createElement("tbody", {}, ...rows);

  return createElement(
    "table",
    { className: "leaderboard" },
    createLeaderboardHeader(),
    body
  );
};

const createLeaderboardResults = (results) =>
  results.length === 0
    ? createElement("p", {
        className: "modal__empty",
        text: "No results yet",
      })
    : createLeaderboardTable(results);

export const createLeaderboardContent = ({ results, close }) =>
  createElement(
    "div",
    { className: "modal__content" },
    createElement("h2", {
      className: "modal__title",
      text: "Leaderboard",
    }),
    createLeaderboardResults(results),
    createModalActions(createCloseButton(close))
  );
