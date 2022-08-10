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
