import { ReactNode, useCallback, useEffect, useState } from "react";
import { GoalsContext } from "./GoalsContext";
import {
  MonthlyGoals,
  loadGoals,
  saveGoals,
} from "../../services/goalsStorage";
import { MonthKey, currentMonthKey } from "../../utils/month";

interface GoalsContextProviderProps {
  children: ReactNode;
}

export function GoalsContextProvider({ children }: GoalsContextProviderProps) {
  const [goals, setGoals] = useState<MonthlyGoals>(() => loadGoals());

  const [selectedMonth, setSelectedMonth] = useState<MonthKey>(() =>
    currentMonthKey()
  );

  const setGoal = useCallback((month: MonthKey, value: number) => {
    setGoals((state) => ({ ...state, [month]: value }));
  }, []);

  const removeGoal = useCallback((month: MonthKey) => {
    setGoals((state) => {
      const { [month]: _removed, ...rest } = state;

      return rest;
    });
  }, []);

  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  return (
    <GoalsContext.Provider
      value={{
        goals,
        selectedMonth,
        setSelectedMonth,
        setGoal,
        removeGoal,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
}
