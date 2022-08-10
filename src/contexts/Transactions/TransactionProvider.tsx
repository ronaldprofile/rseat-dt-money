import { useEffect, useState } from "react";
import { TransactionsContext } from "./TransactionContext";

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
    const baseURL = new URL("http://localhost:3000/transactions");

    if (query) {
      baseURL.searchParams.append("q", query);
    }

    const response = await fetch(baseURL);
    const data = await response.json();

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
