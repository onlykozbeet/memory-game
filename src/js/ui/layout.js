import { createElement } from "../utils/dom";
import { TOTAL_PAIRS } from "../game/deck";

const createHeaderButton = ({ variant, icon, label, onClick }) => {
  const iconElement = createElement("span", {
    className: "button__icon",
    text: icon,
    attrs: { "aria-hidden": "true" },
  });
  const labelElement = createElement("span", { text: label });
  const button = createElement(
    "button",
    { className: `button button--${variant}`, attrs: { type: "button" } },
    iconElement,
    labelElement
  );

  button.addEventListener("click", onClick);
  return button;
};

const createHeader = ({ onNewGame, onOpenLeaderboard }) => {
  const brand = createElement(
    "div",
    { className: "header__brand" },
    createElement("span", {
      className: "header__logo",
      text: "test",
      attrs: { "aria-hidden": "true" },
    }),
    createElement("h1", { className: "header__title", text: "Memory Game" })
  );
  const actions = createElement(
    "div",
    { className: "header__actions" },
    createHeaderButton({
      variant: "ghost",
      icon: "#",
      label: "New Game",
      onClick: onNewGame,
    }),
    createHeaderButton({
      variant: "primary",
      icon: "#",
      label: "Leaderboard",
      onClick: onOpenLeaderboard,
    })
  );

  return createElement("header", { className: "header" }, brand, actions);
};

const createCounters = () => {
  const movesValue = createElement("span", { className: "counter__value" });
  const pairsValue = createElement("span", { className: "counter__value" });
  const pairsTotal = createElement("span", {
    className: "counter__total",
    text: `/ ${TOTAL_PAIRS}`,
  });

  const movesCounter = createElement(
    "div",
    { className: "counter" },
    createElement("span", { className: "counter__label", text: "Moves" }),
    movesValue
  );
  const pairsCounter = createElement(
    "div",
    { className: "counter" },
    createElement("span", {
      className: "counter__label",
      text: "Pairs found",
    }),
    createElement(
      "span",
      { className: "counter__value" },
      pairsValue,
      pairsTotal
    )
  );
  const divider = createElement("div", {
    className: "counter__divider",
    attrs: { "aria-hidden": "true" },
  });
  const element = createElement(
    "section",
    { className: "counters", attrs: { "aria-label": "Game statistics" } },
    movesCounter,
    divider,
    pairsCounter
  );

  return { element, movesValue, movesCounter };
};
export const createLayout = ({ onNewGame, onOpenLeaderboard }) => {
  const { element: counters, movesValue, pairsValue } = createCounters();
  const grid = createElement("div", {
    className: "board",
    attrs: { "aria-label": "game field" },
  });

  const main = createElement("main", { className: "main" }, counters, grid);
  const root = createElement(
    "div",
    { className: "app" },
    createHeader({ onNewGame, onOpenLeaderboard }),
    main
  );

  return { root, grid, movesValue, pairsValue };
};
