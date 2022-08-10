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

  useEffect(() => {
    async function getTransactions() {
      const response = await fetch("http://localhost:3000/transactions");
      const data = await response.json();

      setTransactions(data);
    }

    getTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
