import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { useTransactions } from "../../contexts/Transactions/TransactionContext";

import * as T from "./styles";

export function Transactions() {
  const { transactions } = useTransactions()

  return (
    <div>
      <Header />
      <Summary />

      <T.TransactionContainer>
        <SearchForm />

        <T.TransactionTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <T.PriceHighlight variant={transaction.type}>
                      {transaction.price}
                    </T.PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.created_at}</td>
                </tr>
              );
            })}
          </tbody>
        </T.TransactionTable>
      </T.TransactionContainer>
    </div>
  );
}
