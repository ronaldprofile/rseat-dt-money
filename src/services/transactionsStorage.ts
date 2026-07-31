export interface Transaction {
  id: number;
  description: string;
  category: string;
  price: number;
  type: "income" | "outcome";
  created_at: string;
}

interface CreateTransactionData {
  description: string;
  category: string;
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
    return JSON.parse(stored);
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
