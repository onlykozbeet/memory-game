import { createElement } from "../utils/dom";

const getCardLabel = (card) => {
  if (card.matched) return `Matched card: ${card.symbol}`;
  if (card.opened) return `Open card: ${card.symbol}`;
  return "Face-down card";
};

export const updateCardElement = (card, element) => {
  element.classList.toggle("card--open", card.opened);
  element.classList.toggle("card--matched", card.matched);
  element.setAttribute("aria-label", getCardLabel(card));
};

export const createCardElement = (card, onClick) => {
  const frontFace = createElement("span", {
    className: "card__face card__face--front",
    text: card.symbol,
    attrs: { "aria-hidden": "true" },
  });
  const backFace = createElement("span", {
    className: "card__face card__face--back",
    attrs: { "aria-hidden": "true" },
  });
  const inner = createElement(
    "span",
    { className: "card__inner" },
    backFace,
    frontFace
  );
  const element = createElement(
    "button",
    { className: "card", attrs: { type: "button" } },
    inner
  );

  element.addEventListener("click", onClick);
  updateCardElement(card, element);
  return element;
};
