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
        q: query,
      },
    });

    setTransactions(data);
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, getTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
