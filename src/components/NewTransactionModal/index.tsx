import { useTransactions } from "../../contexts/Transactions/TransactionContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as zod from "zod";
import * as N from "./styles";

const newTransactionFormSchema = zod.object({
  price: zod.number(),
  description: zod.string(),
  category: zod.string(),
  type: zod.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
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

  const { createTransaction } = useTransactions();

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, category, price, type } = data;

    await createTransaction({
      description,
      category,
      price,
      type,
    });

    reset();
  }

  return (
    <Dialog.Portal>
      <N.Overlay />
      <N.Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <N.CloseModalButton title="fechar modal de nova transação">
          <X size={20} />
        </N.CloseModalButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
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
            {isSubmitting ? "Cadastrando" : "Cadastrar"}
          </button>
        </form>
      </N.Content>
    </Dialog.Portal>
  );
}
