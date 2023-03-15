import React from "react";
import { useContext } from "react";
//uuid a function we can call to create a brand new id
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

//allows us to pass around information much easier (like we do with props)
const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"
export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }
  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }
  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }
  function deleteBudget({ id }) {
    //TODO deal with uncategorized expenses
    setExpenses(prevExpenses => {
      return prevExpenses.map(expense => {
        if(expense.budgetId !== id) return expense
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
      })
    })
    setBudgets(prevBudgets => {
        return prevBudgets.filter(budget => budget.id !== id )
    })
  }
  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
