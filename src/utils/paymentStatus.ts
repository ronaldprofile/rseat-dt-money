import { Transaction } from "../services/transactionsStorage";

export type PaymentStatus = "paid" | "partial" | "unpaid";

export interface OutcomePayment {
  status: PaymentStatus;
  // How much of the outcome the overall balance does not cover, in BRL
  remaining: number;
}

export interface PaymentOverview {
  byId: Map<number, OutcomePayment>;
  // Always max(outcomes - incomes, 0)
  unpaidTotal: number;
  unpaidCount: number;
  outcomeCount: number;
}

// Works in cents so 0.1 + 0.2 does not leave a fake partial payment
const toCents = (value: number) => Math.round(value * 100);

// Incomes from every month pay outcomes from the oldest to the newest.
// Simulating month by month gives the same result: unpaid outcomes are
// always the most recent ones and the total paid is min(incomes, outcomes)
export function getPaymentOverview(
  transactions: Transaction[]
): PaymentOverview {
  let available = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + toCents(transaction.price), 0);

  const outcomes = transactions
    .filter((transaction) => transaction.type === "outcome")
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime() ||
        a.id - b.id
    );

  const byId = new Map<number, OutcomePayment>();
  let unpaidCents = 0;
  let unpaidCount = 0;

  outcomes.forEach((outcome) => {
    const price = toCents(outcome.price);
    const covered = Math.min(available, price);
    const remaining = price - covered;

    available -= covered;

    const status: PaymentStatus =
      remaining === 0 ? "paid" : covered > 0 ? "partial" : "unpaid";

    if (remaining > 0) {
      unpaidCents += remaining;
      unpaidCount += 1;
    }

    byId.set(outcome.id, { status, remaining: remaining / 100 });
  });

  return {
    byId,
    unpaidTotal: unpaidCents / 100,
    unpaidCount,
    outcomeCount: outcomes.length,
  };
}
