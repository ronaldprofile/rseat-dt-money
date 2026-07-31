import styled from 'styled-components'

export const TransactionContainer = styled.main`
  width: 100%;
  padding: 0 1.5rem;
  max-width: 1120px;
  margin: 4rem auto 0;
`

export const TransactionTable = styled.table`
  width: 100%;
  margin-top: 1.5rem;
  border-collapse: separate;
  border-spacing: 0 0.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${({ theme }) => theme['gray-700']};
    color: ${({ theme }) => theme['gray-300']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${({ variant, theme }) =>
    variant === 'income' ? theme['green-300'] : theme['red-300']};
`

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
    color: ${({ theme }) => theme['gray-400']};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme['green-300']};
    }

    &:last-child:hover {
      color: ${({ theme }) => theme['red-300']};
    }
  }
`
