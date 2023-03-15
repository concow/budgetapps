import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  if (max === 0) return null;

  return (
    //is like a wrapper around our budget card between UBC and BC
    <BudgetCard amount={amount} name="Total" gray max={max} hideButtons/>
  );
}
