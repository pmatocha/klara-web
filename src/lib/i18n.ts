import cs from "../content/cs.json";
import en from "../content/en.json";

export type Lang = "cs" | "en";

const dict = { cs, en } as const;

type DictNode = Record<string, unknown>;

function isDictNode(v: unknown): v is DictNode {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function createT(lang: Lang) {
  const messages: unknown = dict[lang];

  return function t(path: string): string {
    const parts = path.split(".");
    let cur: unknown = messages;

    for (const p of parts) {
      if (!isDictNode(cur)) return path;
      cur = cur[p];
      if (cur === undefined) return path;
    }

    return typeof cur === "string" ? cur : path;
  };
}
