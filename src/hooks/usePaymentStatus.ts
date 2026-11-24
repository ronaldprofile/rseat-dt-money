import { useMemo } from "react";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../contexts/Transactions/TransactionContext";
import { getPaymentOverview } from "../utils/paymentStatus";

// Uses the raw list so search, filters and sorting never change a status
export function usePaymentStatus() {
  const allTransactions = useContextSelector(
    TransactionsContext,
    (ctx) => ctx.allTransactions
  );

  return useMemo(() => getPaymentOverview(allTransactions), [allTransactions]);
}
