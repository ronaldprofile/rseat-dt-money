import styled from "styled-components";

export const TransactionContainer = styled.main`
  width: 100%;
  padding: 0 1.5rem;
  max-width: 1120px;
  margin: 4rem auto 0;
`;

export const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;

  @media (max-width: 768px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const TableWrapper = styled.div`
  margin-top: 1rem;
  height: 28rem;
  overflow-y: auto;
  border-radius: 6px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme["gray-600"]};
    border-radius: 6px;
  }
`;

export const TransactionTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;

  td {
    padding: 1.25rem 2rem;
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
`;

interface PriceHighlightProps {
  variant: "income" | "outcome";
}

export const PriceCell = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const PriceHighlight = styled.span<PriceHighlightProps>`
  white-space: nowrap;

  color: ${({ variant, theme }) =>
    variant === "income" ? theme["green-300"] : theme["red-300"]};
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;

  button {
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: ${({ theme }) => theme["gray-400"]};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme["green-300"]};
    }

    &:last-child:hover {
      color: ${({ theme }) => theme["red-300"]};
    }
  }
`;

export const GoalSection = styled.section`
  width: 100%;
  padding: 0 1.5rem;
  max-width: 1120px;
  margin: 2rem auto 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
