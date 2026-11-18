import { useEffect } from "react";
import { useContextSelector } from "use-context-selector";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "phosphor-react";
import { GoalsContext } from "../../contexts/Goals/GoalsContext";
import { MonthKey, formatMonth } from "../../utils/month";
import * as Dialog from "@radix-ui/react-dialog";
import * as zod from "zod";
import * as G from "./styles";

interface GoalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  month: MonthKey;
}

const goalFormSchema = zod.object({
  value: zod.number().positive(),
});

type GoalFormInputs = zod.infer<typeof goalFormSchema>;

export function GoalModal({ open, onOpenChange, month }: GoalModalProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<GoalFormInputs>({
    resolver: zodResolver(goalFormSchema),
  });

  const currentGoal = useContextSelector(
    GoalsContext,
    (ctx) => ctx.goals[month]
  );

  const setGoal = useContextSelector(GoalsContext, (ctx) => ctx.setGoal);

  const removeGoal = useContextSelector(GoalsContext, (ctx) => ctx.removeGoal);

  useEffect(() => {
    if (!open) {
      return;
    }

    reset({ value: currentGoal });
  }, [open, currentGoal, reset]);

  function handleSubmitGoal(data: GoalFormInputs) {
    setGoal(month, data.value);
    onOpenChange(false);
  }

  function handleRemoveGoal() {
    removeGoal(month);
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <G.Overlay />
        <G.Content>
          <Dialog.Title>Meta de vendas</Dialog.Title>
          <G.Month>{formatMonth(month)}</G.Month>

          <G.CloseModalButton title="fechar modal">
            <X size={20} />
          </G.CloseModalButton>

          <form onSubmit={handleSubmit(handleSubmitGoal)}>
            <input
              type="number"
              step="0.01"
              min="0.01"
              placeholder="Valor da meta (R$)"
              id="goal-value"
              required
              {...register("value", { valueAsNumber: true })}
            />

            <button type="submit" disabled={isSubmitting}>
              Salvar meta
            </button>

            {currentGoal && (
              <G.RemoveGoalButton type="button" onClick={handleRemoveGoal}>
                Remover meta
              </G.RemoveGoalButton>
            )}
          </form>
        </G.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
