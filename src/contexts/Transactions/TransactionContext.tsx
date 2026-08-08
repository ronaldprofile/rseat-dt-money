import { createContext } from "use-context-selector";
import { Transaction } from "../../services/transactionsStorage";

export interface CreateTransactionData {
  description: string;
  category: string;
  price: number;
  type: "income" | "outcome";
}

export type TransactionTypeFilter = "all" | "income" | "outcome";

interface TransactionContextType {
  transactions: Transaction[];
  typeFilter: TransactionTypeFilter;
  setTypeFilter: (type: TransactionTypeFilter) => void;
  getTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionData) => Promise<void>;
  updateTransaction: (
    id: number,
    data: CreateTransactionData
  ) => Promise<void>;
  removeTransaction: (id: number) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionContextType);
