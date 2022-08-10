import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { useSummary } from "../../hooks/useSummary";
import { formatPrice } from "../../utils/formatter";
import * as S from "./styles";

export function Summary() {
  const { summary } = useSummary();

  return (
    <S.SummaryContainer>
      <S.SummaryCard>
        <header>
          <span>Entradas</span>

          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong> {formatPrice(summary.income)}</strong>
      </S.SummaryCard>

      <S.SummaryCard>
        <header>
          <span>Saídas</span>

          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>{formatPrice(summary.outcome)}</strong>
      </S.SummaryCard>

      <S.SummaryCard variant="green">
        <header>
          <span>Total</span>

          <CurrencyDollar size={30} color="#fff" />
        </header>

        <strong>{formatPrice(summary.total)}</strong>
      </S.SummaryCard>
    </S.SummaryContainer>
  );
}
