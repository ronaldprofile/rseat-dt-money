import { createContext, useContext } from "react";
import { Transaction } from "./TransactionProvider";

interface TransactionContextType {
  transactions: Transaction[];
}

export const TransactionsContext = createContext({} as TransactionContextType);

export const useTransactions = () => useContext(TransactionsContext);
