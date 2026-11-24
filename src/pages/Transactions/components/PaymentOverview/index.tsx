import { CheckCircle, WarningCircle } from "phosphor-react";
import { formatPrice } from "../../../../utils/formatter";
import { PaymentOverview as Overview } from "../../../../utils/paymentStatus";
import * as O from "./styles";

interface PaymentOverviewProps {
  overview: Overview;
}

export function PaymentOverview({ overview }: PaymentOverviewProps) {
  const { unpaidCount, unpaidTotal, outcomeCount } = overview;

  if (outcomeCount === 0) {
    return null;
  }

  if (unpaidCount === 0) {
    return (
      <O.Overview variant="covered">
        <CheckCircle size={16} weight="bold" />
        Todas as saídas estão cobertas pelo saldo
      </O.Overview>
    );
  }

  return (
    <O.Overview variant="uncovered">
      <WarningCircle size={16} weight="bold" />
      <span>
        <strong>
          {unpaidCount} {unpaidCount === 1 ? "saída" : "saídas"} em aberto
        </strong>
        , faltam {formatPrice(unpaidTotal)} para cobrir
      </span>
    </O.Overview>
  );
}
