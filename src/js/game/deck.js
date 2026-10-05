export const CARD_SYMBOLS = ["🍓", "❄️", "🚀", "🌙", "🎵", "🌞", "🦊", "🎸"];

export const TOTAL_PAIRS = CARD_SYMBOLS.length;

export const createDeck = () =>
  CARD_SYMBOLS.flatMap((symbol, symbolIndex) =>
    [0, 1].map((copyIndex) => ({
      id: `${symbolIndex}-${copyIndex}`,
      symbol,
    }))
  );
