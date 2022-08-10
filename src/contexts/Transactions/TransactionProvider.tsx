import { ReactNode, useCallback, useEffect, useState } from "react";
import { TransactionsContext } from "./TransactionContext";
import { api } from "../../services/api";

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

interface TransactionsContextProviderProps {
  children: ReactNode;
}

export function TransactionsContextProvider({
  children,
}: TransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const getTransactions = useCallback(async (query?: string) => {
    const { data } = await api("/transactions", {
      params: {
        _sort: "created_at",
        _order: "desc",
        q: query,
      },
    });

    setTransactions(data);
  }, [])

  const createTransaction = useCallback(async (data: CreateTransactionData) => {
    const { description, category, price, type } = data;

    const response = await api.post("/transactions", {
      description,
      category,
      price,
      type,
      created_at: new Date(),
    });

    setTransactions((state) => [response.data, ...state]);
  }, []);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, getTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
