import { ITEMS } from "./knowledgeItems";

/* ── O(1) lookup by title ────────────────────────── */

const titleMap = new Map(ITEMS.map((item) => [item.title, item]));

export function findItemByTitle(title) {
  return titleMap.get(title) ?? null;
}
