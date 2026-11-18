import { TransactionsContextProvider } from './contexts/Transactions/TransactionProvider'
import { GoalsContextProvider } from './contexts/Goals/GoalsProvider'
import { ThemeProvider } from 'styled-components'
import { Transactions } from './pages/Transactions'
import { GlobalStyles } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      <TransactionsContextProvider>
        <GoalsContextProvider>
          <Transactions />
        </GoalsContextProvider>
      </TransactionsContextProvider>
    </ThemeProvider>
  )
}
