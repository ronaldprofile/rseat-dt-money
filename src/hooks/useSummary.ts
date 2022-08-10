import { useTransactions } from "../contexts/Transactions/TransactionContext";

export function useSummary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }

      return acc;
    },
    {
      total: 0,
      income: 0,
      outcome: 0,
    }
  );

  return {
    summary,
  };
}
