import styled from "styled-components";
import { defaultTheme } from "../../styles/themes/default";
import { PaymentStatus } from "../../utils/paymentStatus";

const statusColor: Record<PaymentStatus, keyof typeof defaultTheme> = {
  paid: "green-300",
  partial: "yellow-300",
  unpaid: "red-300",
};

interface BadgeProps {
  status: PaymentStatus;
}

export const Badge = styled.span<BadgeProps>`
  padding: 0.125rem 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  font-size: 0.75rem;
  font-weight: bold;
  white-space: nowrap;
  border-radius: 999px;

  color: ${({ status, theme }) => theme[statusColor[status]]};
  background: ${({ status, theme }) => `${theme[statusColor[status]]}26`};
`;
