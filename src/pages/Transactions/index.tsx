import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { formatDate, formatPrice } from "../../utils/formatter";
import { TransactionsContext } from "../../contexts/Transactions/TransactionContext";

import * as T from "./styles";
import { useContextSelector } from "use-context-selector";

export function Transactions() {
  const transactions = useContextSelector(
    TransactionsContext,
    (ctx) => ctx.transactions
  );

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
                      {transaction.type === "outcome" && "- "}

                      {formatPrice(transaction.price)}
                    </T.PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{formatDate.format(new Date(transaction.created_at))}</td>
                </tr>
              );
            })}
          </tbody>
        </T.TransactionTable>
      </T.TransactionContainer>
    </div>
  );
}
