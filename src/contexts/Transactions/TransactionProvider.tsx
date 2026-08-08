import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import {
  CreateTransactionData,
  TransactionTypeFilter,
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

  const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>("all");

  const filteredTransactions = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    return transactions.filter((transaction) => {
      const matchesQuery =
        !query ||
        transaction.description.toLowerCase().includes(normalizedQuery);

      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      return matchesQuery && matchesType;
    });
  }, [query, typeFilter, transactions]);

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
        typeFilter,
        setTypeFilter,
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
