import {
  Category,
  FALLBACK_CATEGORY,
  isCategory,
} from "../constants/categories";

export interface Transaction {
  id: number;
  description: string;
  category: Category;
  price: number;
  type: "income" | "outcome";
  created_at: string;
}

interface CreateTransactionData {
  description: string;
  category: Category;
  price: number;
  type: "income" | "outcome";
}

const STORAGE_KEY = "@dt-money:transactions";

export function loadTransactions(): Transaction[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    const transactions: Transaction[] = JSON.parse(stored);

    return transactions.map((transaction) => ({
      ...transaction,
      category: isCategory(transaction.category)
        ? transaction.category
        : FALLBACK_CATEGORY,
    }));
  } catch {
    return [];
  }
}

export function saveTransactions(transactions: Transaction[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export function createLocalTransaction(
  data: CreateTransactionData
): Transaction {
  return {
    id: Date.now(),
    ...data,
    created_at: new Date().toISOString(),
  };
}
