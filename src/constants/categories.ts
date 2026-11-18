export const CATEGORIES = [
  "Venda",
  "Investimento",
  "Produto",
  "Serviço",
  "Alimentação",
  "Transporte",
  "Moradia",
  "Outros",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const SALES_CATEGORY: Category = "Venda";

export const FALLBACK_CATEGORY: Category = "Outros";

export function isCategory(value: unknown): value is Category {
  return CATEGORIES.includes(value as Category);
}
