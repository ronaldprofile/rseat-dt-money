import { useState } from "react";
import { useContextSelector } from "use-context-selector";
import { CaretDown, CaretUp, Trophy } from "phosphor-react";
import { GoalsContext } from "../../../../contexts/Goals/GoalsContext";
import { useMonthlyMetrics } from "../../../../hooks/useMonthlyMetrics";
import { formatPrice } from "../../../../utils/formatter";
import { formatMonth } from "../../../../utils/month";
import * as S from "./styles";

export function MonthlyComparison() {
  const { byMonth, bestMonth, goals } = useMonthlyMetrics();
  const [expanded, setExpanded] = useState(false);

  const selectedMonth = useContextSelector(
    GoalsContext,
    (ctx) => ctx.selectedMonth
  );

  const setSelectedMonth = useContextSelector(
    GoalsContext,
    (ctx) => ctx.setSelectedMonth
  );

  if (byMonth.length === 0) {
    return null;
  }

  return (
    <S.ComparisonContainer>
      <S.ToggleButton
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((state) => !state)}
      >
        Comparativo mês a mês ({byMonth.length}{" "}
        {byMonth.length === 1 ? "mês" : "meses"})
        {expanded ? <CaretUp size={16} /> : <CaretDown size={16} />}
      </S.ToggleButton>

      {expanded && (
        <S.ComparisonTable>
          <thead>
            <tr>
              <th>Mês</th>
              <th>Vendas</th>
              <th>Saídas</th>
              <th>Saldo</th>
              <th>Meta</th>
            </tr>
          </thead>
          <tbody>
            {byMonth.map((summary) => {
              const goal = goals[summary.month];

              return (
                <S.ComparisonRow
                  key={summary.month}
                  selected={summary.month === selectedMonth}
                  onClick={() => setSelectedMonth(summary.month)}
                  title="ver este mês no card de meta"
                >
                  <td>
                    <S.MonthName>
                      {formatMonth(summary.month)}
                      {summary.month === bestMonth && (
                        <S.BestMonthBadge>
                          <Trophy size={14} weight="fill" />
                          Melhor mês
                        </S.BestMonthBadge>
                      )}
                    </S.MonthName>
                  </td>
                  <td>
                    <S.Amount variant="income">
                      {formatPrice(summary.sold)}
                    </S.Amount>
                  </td>
                  <td>
                    <S.Amount variant="outcome">
                      {formatPrice(summary.outcome)}
                    </S.Amount>
                  </td>
                  <td>{formatPrice(summary.balance)}</td>
                  <td>
                    {goal
                      ? `${Math.round((summary.sold / goal) * 100)}%`
                      : "—"}
                  </td>
                </S.ComparisonRow>
              );
            })}
          </tbody>
        </S.ComparisonTable>
      )}
    </S.ComparisonContainer>
  );
}
