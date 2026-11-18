import { SALES_CATEGORY } from "../constants/categories";
import { Transaction } from "../services/transactionsStorage";
import { MonthKey, daysInMonth, toMonthKey } from "./month";

export type GoalStatus =
  | "no-goal"
  | "achieved"
  | "on-track"
  | "behind"
  | "missed"
  | "upcoming";

export interface MonthSummary {
  month: MonthKey;
  sold: number;
  income: number;
  outcome: number;
  balance: number;
}

export interface GoalProgress {
  goal?: number;
  remaining: number;
  surplus: number;
  progress: number;
  expectedPace: number;
  status: GoalStatus;
}

export function isSale(transaction: Transaction): boolean {
  return (
    transaction.type === "income" && transaction.category === SALES_CATEGORY
  );
}

export function emptyMonthSummary(month: MonthKey): MonthSummary {
  return { month, sold: 0, income: 0, outcome: 0, balance: 0 };
}

// Most recent month first; months without transactions are left out
export function groupByMonth(transactions: Transaction[]): MonthSummary[] {
  const months = new Map<MonthKey, MonthSummary>();

  transactions.forEach((transaction) => {
    const month = toMonthKey(new Date(transaction.created_at));
    const summary = months.get(month) ?? emptyMonthSummary(month);

    if (transaction.type === "income") {
      summary.income += transaction.price;
      summary.balance += transaction.price;
    } else {
      summary.outcome += transaction.price;
      summary.balance -= transaction.price;
    }

    if (isSale(transaction)) {
      summary.sold += transaction.price;
    }

    months.set(month, summary);
  });

  return [...months.values()].sort((a, b) => b.month.localeCompare(a.month));
}

export function getGoalProgress(
  month: MonthKey,
  sold: number,
  goal: number | undefined,
  now = new Date()
): GoalProgress {
  const currentMonth = toMonthKey(now);

  const expectedPace =
    month < currentMonth
      ? 1
      : month > currentMonth
      ? 0
      : now.getDate() / daysInMonth(month);

  if (!goal) {
    return {
      remaining: 0,
      surplus: 0,
      progress: 0,
      expectedPace,
      status: "no-goal",
    };
  }

  const progress = sold / goal;

  let status: GoalStatus;

  if (sold >= goal) {
    status = "achieved";
  } else if (month > currentMonth) {
    status = "upcoming";
  } else if (month < currentMonth) {
    status = "missed";
  } else {
    status = progress >= expectedPace ? "on-track" : "behind";
  }

  return {
    goal,
    remaining: Math.max(goal - sold, 0),
    surplus: Math.max(sold - goal, 0),
    progress,
    expectedPace,
    status,
  };
}

// Highest sales wins; on a tie the most recent month wins
export function getBestMonth(months: MonthSummary[]): MonthKey | undefined {
  let best: MonthSummary | undefined;

  for (const summary of months) {
    if (summary.sold <= 0) {
      continue;
    }

    if (
      !best ||
      summary.sold > best.sold ||
      (summary.sold === best.sold && summary.month > best.month)
    ) {
      best = summary;
    }
  }

  return best?.month;
}
