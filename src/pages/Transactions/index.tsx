import { useState } from "react";
import { PencilSimple, Trash } from "phosphor-react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { NewTransactionModal } from "../../components/NewTransactionModal";
import { MonthSelector } from "../../components/MonthSelector";
import { GoalCard } from "../../components/GoalCard";
import { SearchForm } from "./components/SearchForm";
import { TypeFilter } from "./components/TypeFilter";
import { SortFilter } from "./components/SortFilter";
import { MonthlyComparison } from "./components/MonthlyComparison";
import { formatDate, formatPrice } from "../../utils/formatter";
import { TransactionsContext } from "../../contexts/Transactions/TransactionContext";
import { Transaction } from "../../services/transactionsStorage";

import * as T from "./styles";
import { useContextSelector } from "use-context-selector";

export function Transactions() {
  const transactions = useContextSelector(
    TransactionsContext,
    ctx => ctx.transactions
  );

  const removeTransaction = useContextSelector(
    TransactionsContext,
    ctx => ctx.removeTransaction
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);

  function handleOpenNewTransaction() {
    setTransactionToEdit(null);
    setModalOpen(true);
  }

  function handleOpenEditTransaction(transaction: Transaction) {
    setTransactionToEdit(transaction);
    setModalOpen(true);
  }

  return (
    <div>
      <Header onNewTransaction={handleOpenNewTransaction} />
      <Summary />

      <T.GoalSection>
        <MonthSelector />

        <GoalCard />

        <MonthlyComparison />
      </T.GoalSection>

      <T.TransactionContainer>
        <SearchForm />

        <T.FiltersBar>
          <TypeFilter />

          <SortFilter />
        </T.FiltersBar>
        <T.TableWrapper>
          <T.TransactionTable>
          <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <T.PriceHighlight variant={transaction.type}>
                      {formatPrice(transaction.price)}
                    </T.PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{formatDate.format(new Date(transaction.created_at))}</td>
                  <td>
                    <T.ActionsContainer>
                      <button
                        type="button"
                        title="editar transação"
                        onClick={() => handleOpenEditTransaction(transaction)}
                      >
                        <PencilSimple size={20} />
                      </button>
                      <button
                        type="button"
                        title="remover transação"
                        onClick={() => removeTransaction(transaction.id)}
                      >
                        <Trash size={20} />
                      </button>
                    </T.ActionsContainer>
                  </td>
                </tr>
              );
            })}
          </tbody>
          </T.TransactionTable>
        </T.TableWrapper>
      </T.TransactionContainer>

      <NewTransactionModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        transaction={transactionToEdit}
      />
    </div>
  );
}
