import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";

import * as T from "./styles";

interface Transaction {
  id: number;
  description: string;
  category: string;
  price: number;
  type: "income" | "outcome";
  created_at: string;
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function getTransactions() {
      const response = await fetch("http://localhost:3000/transactions");
      const data = await response.json();

      setTransactions(data);
    }

    getTransactions();
  }, []);

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
