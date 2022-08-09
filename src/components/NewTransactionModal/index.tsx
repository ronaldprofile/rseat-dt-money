import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as N from "./styles";

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <N.Overlay />
      <N.Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <N.CloseModalButton title="fechar modal de nova transação">
          <X size={20} />
        </N.CloseModalButton>

        <form>
          <input type="text" placeholder="Descrição" id="description" />
          <input type="number" placeholder="Preço" id="price" />
          <input type="text" placeholder="Categoria" id="category" />

          <N.TransactionType>
            <N.TransactionTypeButton type="button" variant="income" value="income">
              <ArrowCircleUp size={24} />
              Entrada
            </N.TransactionTypeButton>
            <N.TransactionTypeButton type="button" variant="outcome" value="outcome">
              <ArrowCircleDown size={24} />
              Saída
            </N.TransactionTypeButton>
          </N.TransactionType>

          <button type="submit">Cadastrar</button>
        </form>
      </N.Content>
    </Dialog.Portal>
  );
}
