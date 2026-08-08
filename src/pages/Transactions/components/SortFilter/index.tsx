import { useContextSelector } from "use-context-selector";
import { ArrowDown, ArrowUp, ClockCounterClockwise } from "phosphor-react";
import { TransactionsContext } from "../../../../contexts/Transactions/TransactionContext";
import { TransactionSortOrder } from "../../../../contexts/Transactions/TransactionContext";
import * as S from "./styles";

const options: {
  value: TransactionSortOrder;
  label: string;
  icon: JSX.Element;
}[] = [
  {
    value: "date-desc",
    label: "Mais recentes",
    icon: <ClockCounterClockwise size={14} />,
  },
  {
    value: "price-desc",
    label: "Maior preço",
    icon: <ArrowUp size={14} />,
  },
  {
    value: "price-asc",
    label: "Menor preço",
    icon: <ArrowDown size={14} />,
  },
];

export function SortFilter() {
  const sortOrder = useContextSelector(
    TransactionsContext,
    (ctx) => ctx.sortOrder
  );

  const setSortOrder = useContextSelector(
    TransactionsContext,
    (ctx) => ctx.setSortOrder
  );

  return (
    <S.SortFilterContainer>
      {options.map((option) => (
        <S.SortButton
          key={option.value}
          type="button"
          active={sortOrder === option.value}
          onClick={() => setSortOrder(option.value)}
        >
          {option.icon}
          {option.label}
        </S.SortButton>
      ))}
    </S.SortFilterContainer>
  );
}
