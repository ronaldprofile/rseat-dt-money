import { useEffect } from "react";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../contexts/Transactions/TransactionContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Transaction } from "../../services/transactionsStorage";
import * as Dialog from "@radix-ui/react-dialog";
import * as zod from "zod";
import * as N from "./styles";

interface NewTransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: Transaction | null;
}

const newTransactionFormSchema = zod.object({
  price: zod.number(),
  description: zod.string(),
  category: zod.string(),
  type: zod.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal({
  open,
  onOpenChange,
  transaction = null,
}: NewTransactionModalProps) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    reset,
    control,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: "income",
    },
  });

  const createTransaction = useContextSelector(
    TransactionsContext,
    (ctx) => ctx.createTransaction
  );

  const updateTransaction = useContextSelector(
    TransactionsContext,
    (ctx) => ctx.updateTransaction
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    reset(transaction ?? { type: "income" });
  }, [open, transaction, reset]);

  async function handleSubmitTransaction(data: NewTransactionFormInputs) {
    const { description, category, price, type } = data;

    if (transaction) {
      await updateTransaction(transaction.id, {
        description,
        category,
        price,
        type,
      });
    } else {
      await createTransaction({
        description,
        category,
        price,
        type,
      });
    }

    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <N.Overlay />
        <N.Content>
          <Dialog.Title>
            {transaction ? "Editar transação" : "Nova transação"}
          </Dialog.Title>
          <N.CloseModalButton title="fechar modal">
            <X size={20} />
          </N.CloseModalButton>

          <form onSubmit={handleSubmit(handleSubmitTransaction)}>
            <input
              type="text"
              placeholder="Descrição"
              id="description"
              {...register("description")}
            />

            <input
              type="number"
              placeholder="Preço"
              id="price"
              {...register("price", { valueAsNumber: true })}
            />

            <input
              type="text"
              placeholder="Categoria"
              id="category"
              {...register("category")}
            />

            <Controller
              name="type"
              control={control}
              render={({ field }) => {
                return (
                  <N.TransactionType
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <N.TransactionTypeButton
                      type="button"
                      variant="income"
                      value="income"
                    >
                      <ArrowCircleUp size={24} />
                      Entrada
                    </N.TransactionTypeButton>
                    <N.TransactionTypeButton
                      type="button"
                      variant="outcome"
                      value="outcome"
                    >
                      <ArrowCircleDown size={24} />
                      Saída
                    </N.TransactionTypeButton>
                  </N.TransactionType>
                );
              }}
            />

            <button type="submit" disabled={isSubmitting}>
              {transaction ? "Salvar" : "Cadastrar"}
            </button>
          </form>
        </N.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
