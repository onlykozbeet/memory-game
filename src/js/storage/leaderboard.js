const STORAGE_KEY = "leaderboard";
const MAX_RESULTS = 10;

const isValidResult = (result) =>
  typeof result?.moves === "number" &&
  Number.isFinite(result.moves) &&
  typeof result?.playedAt === "string";

const readResults = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isValidResult) : [];
  } catch {
    return [];
  }
};

const sortResults = (results) =>
  [...results].sort(
    (first, second) =>
      first.moves - second.moves ||
      first.playedAt.localeCompare(second.playedAt)
  );

export const loadResults = () =>
  sortResults(readResults()).slice(0, MAX_RESULTS);

export const saveResult = (moves) => {
  const results = sortResults([
    ...readResults(),
    { moves, playedAt: new Date().toISOString() },
  ]);
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(results.slice(0, MAX_RESULTS))
  );
};
