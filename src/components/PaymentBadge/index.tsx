import { CheckCircle, CircleHalf, WarningCircle } from "phosphor-react";
import { formatPrice } from "../../utils/formatter";
import { OutcomePayment } from "../../utils/paymentStatus";
import * as P from "./styles";

const statusDisplay = {
  paid: { label: "Pago", Icon: CheckCircle },
  partial: { label: "Parcial", Icon: CircleHalf },
  unpaid: { label: "Em aberto", Icon: WarningCircle },
};

interface PaymentBadgeProps {
  payment: OutcomePayment;
}

export function PaymentBadge({ payment }: PaymentBadgeProps) {
  const { status, remaining } = payment;
  const { label, Icon } = statusDisplay[status];

  const description =
    status === "paid"
      ? "Coberto pelo saldo geral"
      : `Faltam ${formatPrice(remaining)} para cobrir`;

  return (
    <P.Badge status={status} title={description} aria-label={`${label}. ${description}`}>
      <Icon size={14} weight="bold" />
      {label}
    </P.Badge>
  );
}
