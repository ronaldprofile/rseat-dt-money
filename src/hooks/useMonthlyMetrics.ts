import { useMemo } from "react";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../contexts/Transactions/TransactionContext";
import { GoalsContext } from "../contexts/Goals/GoalsContext";
import {
  emptyMonthSummary,
  getBestMonth,
  getGoalProgress,
  groupByMonth,
} from "../utils/monthlyMetrics";

export function useMonthlyMetrics() {
  const allTransactions = useContextSelector(
    TransactionsContext,
    (ctx) => ctx.allTransactions
  );

  const goals = useContextSelector(GoalsContext, (ctx) => ctx.goals);

  const selectedMonth = useContextSelector(
    GoalsContext,
    (ctx) => ctx.selectedMonth
  );

  const byMonth = useMemo(
    () => groupByMonth(allTransactions),
    [allTransactions]
  );

  const bestMonth = useMemo(() => getBestMonth(byMonth), [byMonth]);

  const selected = useMemo(() => {
    const summary =
      byMonth.find((month) => month.month === selectedMonth) ??
      emptyMonthSummary(selectedMonth);

    return {
      ...summary,
      ...getGoalProgress(selectedMonth, summary.sold, goals[selectedMonth]),
    };
  }, [byMonth, goals, selectedMonth]);

  return {
    selected,
    byMonth,
    bestMonth,
    goals,
  };
}
