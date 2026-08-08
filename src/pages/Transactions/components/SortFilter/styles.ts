import styled, { css } from 'styled-components'

interface SortButtonProps {
  active: boolean
}

export const SortFilterContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export const SortButton = styled.button<SortButtonProps>`
  padding: 0.375rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;

  font-size: 0.875rem;
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

  ${({ active, theme }) =>
    active &&
    css`
      border-color: ${theme['gray-500']};
      color: ${theme['gray-100']};
      background: ${theme['gray-600']};
    `}
`
