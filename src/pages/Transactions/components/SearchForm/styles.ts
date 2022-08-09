import styled from "styled-components";

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    padding: 1rem;
    flex: 1;
    border: 0;
    border-radius: 6px;

    background: ${({ theme }) => theme["gray-900"]};
    color: ${({ theme }) => theme["gray-300"]};

    &::placeholder {
      color: ${({ theme }) => theme["gray-500"]};
    }
  }

  button {
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: bold;
    background: transparent;
    color: ${({ theme }) => theme["green-300"]};
    border: 1px solid ${({ theme }) => theme["green-300"]};
    border-radius: 6px;

    &:hover {
      background: ${({ theme }) => theme["green-500"]};
      color: ${({ theme }) => theme.white};
      border-color: ${({ theme }) => theme["green-500"]};

      transition: all 0.2s;
    }
  }
`;
