import { useState } from "react";
import { Target } from "phosphor-react";
import { GoalModal } from "../GoalModal";
import { useMonthlyMetrics } from "../../hooks/useMonthlyMetrics";
import { formatPrice } from "../../utils/formatter";
import * as G from "./styles";

export function GoalCard() {
  const { selected } = useMonthlyMetrics();
  const [modalOpen, setModalOpen] = useState(false);

  const { goal, sold, remaining, surplus, progress, expectedPace, status } =
    selected;

  const statusMessage = {
    "no-goal": "Defina uma meta para este mês",
    achieved: surplus
      ? `Meta atingida — ${formatPrice(surplus)} acima`
      : "Meta atingida",
    "on-track": `Faltam ${formatPrice(remaining)}`,
    behind: `Faltam ${formatPrice(remaining)} — abaixo do ritmo`,
    missed: `Faltaram ${formatPrice(remaining)}`,
    upcoming: `Meta de ${formatPrice(goal ?? 0)}`,
  }[status];

  return (
    <G.GoalCardContainer status={status}>
      <header>
        <span>Meta de vendas</span>

        <G.EditGoalButton type="button" onClick={() => setModalOpen(true)}>
          <Target size={18} />
          {goal ? "Editar meta" : "Definir meta"}
        </G.EditGoalButton>
      </header>

      <G.Amounts>
        <strong>{formatPrice(sold)}</strong>
        {goal && <span>de {formatPrice(goal)}</span>}
      </G.Amounts>

      {goal && (
        <G.ProgressBar>
          <G.ProgressFill
            status={status}
            style={{ width: `${Math.min(progress, 1) * 100}%` }}
          />
          {status !== "achieved" && expectedPace > 0 && expectedPace < 1 && (
            <G.PaceMarker
              title="ritmo esperado para hoje"
              style={{ left: `${expectedPace * 100}%` }}
            />
          )}
        </G.ProgressBar>
      )}

      <G.Footer>
        <span>{statusMessage}</span>
        {goal && <strong>{Math.round(progress * 100)}%</strong>}
      </G.Footer>

      <GoalModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        month={selected.month}
      />
    </G.GoalCardContainer>
  );
}
