import { useMemo } from "react";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../contexts/Transactions/TransactionContext";

export function useSummary() {
  const transactions = useContextSelector(
    TransactionsContext,
    (ctx) => ctx.transactions
  );

  const summary = useMemo(() => {
    return transactions.reduce(
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
  }, [transactions]);

  return {
    summary,
  };
}
