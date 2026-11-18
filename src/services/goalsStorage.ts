import { MonthKey } from "../utils/month";

export type MonthlyGoals = Record<MonthKey, number>;

const STORAGE_KEY = "@dt-money:goals";

export function loadGoals(): MonthlyGoals {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return {};
  }

  try {
    return JSON.parse(stored);
  } catch {
    return {};
  }
}

export function saveGoals(goals: MonthlyGoals): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
}
