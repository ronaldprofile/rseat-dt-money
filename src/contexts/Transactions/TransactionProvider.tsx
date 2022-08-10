import { useEffect, useState } from "react";
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
  children: JSX.Element;
}

export function TransactionsContextProvider({
  children,
}: TransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function getTransactions(query?: string) {
    const { data } = await api("/transactions", {
      params: {
        _sort: "created_at",
        _order: "desc",
        q: query,
      },
    });

    setTransactions(data);
  }

  async function createTransaction(data: CreateTransactionData) {
    const { description, category, price, type } = data;

    const response = await api.post("/transactions", {
      description,
      category,
      price,
      type,
      created_at: new Date(),
    });

    setTransactions((state) => [response.data, ...state]);
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, getTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
