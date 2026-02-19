import { Budgets, Transactions } from "@/types";
import { BudgetWithTransactionsAmounts } from "@/interfaces";

export function budgetsWithTransactionsAmounts(
  budgets: Budgets[],
  transactions: Transactions[],
): BudgetWithTransactionsAmounts[] {
  return budgets.map((budget) => ({
    /*W tym momencie każdy element MUSI mieć _type, ponieważ interfejs
         BudgetsWithTransactionsAmounts wymaga go (to nie jest opcjonalne pole).
         Dzięki temu TypeScript dokładnie wie, z jakim typem ma do czynienia
         w momencie przekazywania danych np. do komponentu BudgetChart. */
    _type: "BudgetsWithTransactionsAmounts", //potrzebne, bo inaczej TS zgłosi brak wymaganego pola
    category: budget.category,
    maximum: budget.maximum,
    theme: budget.theme,
    transactions: transactions
      .filter((transaction) => transaction.category === budget.category)
      .map(({ amount }) => ({ amount })),
  }));
}
