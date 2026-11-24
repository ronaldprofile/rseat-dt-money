import styled from "styled-components";

interface OverviewProps {
  variant: "covered" | "uncovered";
}

export const Overview = styled.p<OverviewProps>`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;

  color: ${({ variant, theme }) =>
    variant === "covered" ? theme["green-300"] : theme["red-300"]};

  strong {
    font-weight: bold;
  }
`;
