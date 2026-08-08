import { useContextSelector } from "use-context-selector";
import { ArrowDown, ArrowUp, FunnelSimple } from "phosphor-react";
import { TransactionsContext } from "../../../../contexts/Transactions/TransactionContext";
import * as S from "./styles";

const options = [
  { value: "all" as const, label: "Todos", icon: null },
  { value: "income" as const, label: "Entradas", icon: <ArrowUp size={16} /> },
  { value: "outcome" as const, label: "Saídas", icon: <ArrowDown size={16} /> },
];

export function TypeFilter() {
  const typeFilter = useContextSelector(
    TransactionsContext,
    (ctx) => ctx.typeFilter
  );

  const setTypeFilter = useContextSelector(
    TransactionsContext,
    (ctx) => ctx.setTypeFilter
  );

  return (
    <S.TypeFilterContainer>
      <FunnelSimple size={20} />
      {options.map((option) => (
        <S.FilterButton
          key={option.value}
          type="button"
          variant={option.value}
          active={typeFilter === option.value}
          onClick={() => setTypeFilter(option.value)}
        >
          {option.icon}
          {option.label}
        </S.FilterButton>
      ))}
    </S.TypeFilterContainer>
  );
}
