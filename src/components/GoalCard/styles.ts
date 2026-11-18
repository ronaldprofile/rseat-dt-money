import styled, { css } from "styled-components";
import { GoalStatus } from "../../utils/monthlyMetrics";

interface StatusProps {
  status: GoalStatus;
}

const isRed = (status: GoalStatus) =>
  status === "behind" || status === "missed";

export const GoalCardContainer = styled.div<StatusProps>`
  padding: 2rem;
  border-radius: 6px;
  background: ${({ theme }) => theme["gray-600"]};
  transition: background 0.2s;

  ${({ status, theme }) =>
    status === "achieved" &&
    css`
      background: ${theme["green-700"]};
    `}

  ${({ status, theme }) =>
    isRed(status) &&
    css`
      background: ${theme["red-700"]};
    `}

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    span {
      color: ${({ theme }) => theme["gray-300"]};
    }
  }

  @media (max-width: 425px) {
    padding: 1.5rem;
  }
`;

export const EditGoalButton = styled.button`
  padding: 0.375rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme["gray-100"]};

  &:hover {
    background: rgba(0, 0, 0, 0.35);
  }
`;

export const Amounts = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem;

  strong {
    font-size: 2rem;
  }

  span {
    color: ${({ theme }) => theme["gray-300"]};
  }
`;

export const ProgressBar = styled.div`
  position: relative;
  height: 0.5rem;
  margin-top: 1rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.3);
`;

export const ProgressFill = styled.div<StatusProps>`
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s;

  background: ${({ status, theme }) =>
    isRed(status)
      ? theme["red-300"]
      : status === "upcoming"
      ? theme["gray-500"]
      : theme["green-300"]};
`;

export const PaceMarker = styled.span`
  position: absolute;
  top: -0.25rem;
  width: 2px;
  height: 1rem;
  border-radius: 1px;
  background: ${({ theme }) => theme["gray-100"]};
  transform: translateX(-1px);
`;

export const Footer = styled.footer`
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  span {
    color: ${({ theme }) => theme["gray-100"]};
  }
`;
