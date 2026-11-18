import styled from "styled-components";

export const MonthSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  strong {
    min-width: 10rem;
    text-align: center;
    color: ${({ theme }) => theme["gray-100"]};
  }

  > button {
    padding: 0.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    border: 1px solid ${({ theme }) => theme["gray-600"]};
    border-radius: 6px;
    background: ${({ theme }) => theme["gray-700"]};
    color: ${({ theme }) => theme["gray-300"]};

    &:hover {
      border-color: ${({ theme }) => theme["gray-500"]};
      color: ${({ theme }) => theme["gray-100"]};
    }
  }
`;

export const TodayButton = styled.button`
  && {
    padding: 0.375rem 0.75rem;
    line-height: normal;
    font-size: 0.875rem;
    font-weight: bold;
    color: ${({ theme }) => theme["green-300"]};
  }
`;
