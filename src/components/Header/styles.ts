import styled from 'styled-components'

export const HeaderContainer = styled.header`
  padding: 2.5rem 0 7.5rem;
  background: ${({ theme }) => theme['gray-900']};
`

export const HeaderContent = styled.div`
  width: 100%;
  padding: 0 1.5rem;
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const NewTransactionButton = styled.button`
  height: 50px;
  padding: 0 1.5rem;
  font-weight: bold;
  border: 0;
  border-radius: 6px;
  background: ${({ theme }) => theme['green-500']};
  color: ${({ theme }) => theme.white};

  &:hover {
    background: ${({ theme }) => theme['green-700']};
    transition: background 0.2s;
  }
`
