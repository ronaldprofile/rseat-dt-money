import styled, { css } from 'styled-components'

export const SummaryContainer = styled.section`
  width: 100%;
  padding: 0 1.5rem;
  max-width: 1120px;
  margin: 0 auto;

  margin-top: -5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`

interface SummaryCardProps {
  variant?: 'green'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  padding: 2rem;
  background: ${({ theme }) => theme['gray-600']};
  border-radius: 6px;

  ${(props) =>
    props.variant === 'green' &&
    css`
      background: ${({ theme }) => theme['green-700']};
    `}

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      color: ${({ theme }) => theme['gray-300']};
    }
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }
`
