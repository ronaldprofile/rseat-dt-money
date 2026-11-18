import styled, { css } from "styled-components";

export const ComparisonContainer = styled.div``;

export const ToggleButton = styled.button`
  padding: 0.375rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme["gray-600"]};
  border-radius: 6px;
  background: ${({ theme }) => theme["gray-700"]};
  color: ${({ theme }) => theme["gray-300"]};

  &:hover {
    border-color: ${({ theme }) => theme["gray-500"]};
    color: ${({ theme }) => theme["gray-100"]};
  }
`;

export const ComparisonTable = styled.table`
  width: 100%;
  margin-top: 0.5rem;
  border-collapse: separate;
  border-spacing: 0 0.5rem;

  th {
    padding: 0 1.5rem;
    text-align: left;
    font-size: 0.875rem;
    font-weight: normal;
    color: ${({ theme }) => theme["gray-500"]};
  }

  td {
    padding: 1rem 1.5rem;
    background: ${({ theme }) => theme["gray-700"]};
    color: ${({ theme }) => theme["gray-300"]};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  @media (max-width: 768px) {
    th:nth-child(3),
    th:nth-child(4),
    td:nth-child(3),
    td:nth-child(4) {
      display: none;
    }

    th,
    td {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
`;

interface ComparisonRowProps {
  selected: boolean;
}

export const ComparisonRow = styled.tr<ComparisonRowProps>`
  cursor: pointer;

  &:hover td {
    background: ${({ theme }) => theme["gray-600"]};
  }

  ${({ selected, theme }) =>
    selected &&
    css`
      td {
        background: ${theme["gray-600"]};
        color: ${theme["gray-100"]};
      }
    `}
`;

export const MonthName = styled.span`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const BestMonthBadge = styled.span`
  padding: 0.125rem 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 999px;
  background: ${({ theme }) => theme["green-700"]};
  color: ${({ theme }) => theme["green-300"]};
`;

interface AmountProps {
  variant: "income" | "outcome";
}

export const Amount = styled.span<AmountProps>`
  color: ${({ variant, theme }) =>
    variant === "income" ? theme["green-300"] : theme["red-300"]};
`;
