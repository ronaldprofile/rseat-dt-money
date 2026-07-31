import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import {
  CreateTransactionData,
  TransactionsContext,
} from "./TransactionContext";
import {
  Transaction,
  createLocalTransaction,
  loadTransactions,
  saveTransactions,
} from "../../services/transactionsStorage";

interface TransactionsContextProviderProps {
  children: ReactNode;
}

export function TransactionsContextProvider({
  children,
}: TransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    loadTransactions()
  );

  const [query, setQuery] = useState("");

  const filteredTransactions = useMemo(() => {
    if (!query) {
      return transactions;
    }

    const normalizedQuery = query.toLowerCase();

    return transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(normalizedQuery)
    );
  }, [query, transactions]);

  const getTransactions = useCallback(async (searchQuery?: string) => {
    setQuery(searchQuery ?? "");
  }, []);

  const createTransaction = useCallback(async (data: CreateTransactionData) => {
    const transaction = createLocalTransaction(data);

    setTransactions((state) => [transaction, ...state]);
  }, []);

  const updateTransaction = useCallback(
    async (id: number, data: CreateTransactionData) => {
      setTransactions((state) =>
        state.map((transaction) =>
          transaction.id === id ? { ...transaction, ...data } : transaction
        )
      );
    },
    []
  );

  const removeTransaction = useCallback(async (id: number) => {
    setTransactions((state) =>
      state.filter((transaction) => transaction.id !== id)
    );
  }, []);

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions: filteredTransactions,
        getTransactions,
        createTransaction,
        updateTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
