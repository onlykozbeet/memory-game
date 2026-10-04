export const CARD_SYMBOLS = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const TOTAL_PAIRS = CARD_SYMBOLS.length;

export const createDeck = () =>
  CARD_SYMBOLS.flatMap((symbol, symbolIndex) =>
    [0, 1].map((copyIndex) => ({
      id: `${symbolIndex}-${copyIndex}`,
      symbol,
    }))
  );
