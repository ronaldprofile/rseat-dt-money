import styled, { css } from 'styled-components'
import { TransactionTypeFilter } from '../../../../contexts/Transactions/TransactionContext'

interface FilterButtonProps {
  active: boolean
  variant: 'all' | TransactionTypeFilter
}

export const TypeFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`

export const FilterButton = styled.button<FilterButtonProps>`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-weight: bold;
  border: 1px solid ${({ theme }) => theme['gray-600']};
  border-radius: 6px;

  background: ${({ theme }) => theme['gray-700']};
  color: ${({ theme }) => theme['gray-400']};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme['gray-500']};
    color: ${({ theme }) => theme['gray-300']};
  }

  ${({ variant, active, theme }) =>
    active &&
    css`
      border-color: ${variant === 'income'
        ? theme['green-500']
        : variant === 'outcome'
        ? theme['red-500']
        : theme['gray-500']};
      color: ${variant === 'income'
        ? theme['green-300']
        : variant === 'outcome'
        ? theme['red-300']
        : theme['gray-100']};
      background: ${variant === 'income'
        ? theme['green-700']
        : variant === 'outcome'
        ? theme['red-700']
        : theme['gray-600']};
    `}
`
