import { createContext } from "use-context-selector";
import { MonthlyGoals } from "../../services/goalsStorage";
import { MonthKey } from "../../utils/month";

interface GoalsContextType {
  goals: MonthlyGoals;
  selectedMonth: MonthKey;
  setSelectedMonth: (month: MonthKey) => void;
  setGoal: (month: MonthKey, value: number) => void;
  removeGoal: (month: MonthKey) => void;
}

export const GoalsContext = createContext({} as GoalsContextType);
