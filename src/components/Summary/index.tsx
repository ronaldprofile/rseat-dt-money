import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { useTransactions } from "../../contexts/Transactions/TransactionContext";
import * as S from "./styles";

export function Summary() {
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

  return (
    <S.SummaryContainer>
      <S.SummaryCard>
        <header>
          <span>Entradas</span>

          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{summary.income}</strong>
      </S.SummaryCard>

      <S.SummaryCard>
        <header>
          <span>Saídas</span>

          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>{summary.outcome}</strong>
      </S.SummaryCard>

      <S.SummaryCard variant="green">
        <header>
          <span>Total</span>

          <CurrencyDollar size={30} color="#fff" />
        </header>

        <strong>{summary.total}</strong>
      </S.SummaryCard>
    </S.SummaryContainer>
  );
}
