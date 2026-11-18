import { useContextSelector } from "use-context-selector";
import { CaretLeft, CaretRight } from "phosphor-react";
import { GoalsContext } from "../../contexts/Goals/GoalsContext";
import { currentMonthKey, formatMonth, shiftMonth } from "../../utils/month";
import * as S from "./styles";

export function MonthSelector() {
  const selectedMonth = useContextSelector(
    GoalsContext,
    (ctx) => ctx.selectedMonth
  );

  const setSelectedMonth = useContextSelector(
    GoalsContext,
    (ctx) => ctx.setSelectedMonth
  );

  const isCurrentMonth = selectedMonth === currentMonthKey();

  return (
    <S.MonthSelectorContainer>
      <button
        type="button"
        title="mês anterior"
        onClick={() => setSelectedMonth(shiftMonth(selectedMonth, -1))}
      >
        <CaretLeft size={18} />
      </button>

      <strong>{formatMonth(selectedMonth)}</strong>

      <button
        type="button"
        title="próximo mês"
        onClick={() => setSelectedMonth(shiftMonth(selectedMonth, 1))}
      >
        <CaretRight size={18} />
      </button>

      {!isCurrentMonth && (
        <S.TodayButton
          type="button"
          onClick={() => setSelectedMonth(currentMonthKey())}
        >
          Mês atual
        </S.TodayButton>
      )}
    </S.MonthSelectorContainer>
  );
}
