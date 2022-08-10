import styled from "styled-components";

export const HeaderContainer = styled.header`
  padding: 2.5rem 0 7.5rem;
  background: ${({ theme }) => theme["gray-900"]};
`;

export const HeaderContent = styled.div`
  width: 100%;
  padding: 0 1.5rem;
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 425px) {
    img {
      height: 25px;
    }
  }
`;

export const NewTransactionButton = styled.button`
  height: 50px;
  padding: 0 1.5rem;
  font-weight: bold;
  border: 0;
  border-radius: 6px;
  background: ${({ theme }) => theme["green-500"]};
  color: ${({ theme }) => theme.white};

  &:hover {
    background: ${({ theme }) => theme["green-700"]};
    transition: background 0.2s;
  }

  @media (max-width: 425px) {
    height: 2.375rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
`;
