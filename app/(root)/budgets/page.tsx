import data from "@/data/data.json";
import { Budgets as BudgetsType } from "@/types";
import BudgetChart from "@/components/shared/BudgetChart";
import SectionCard from "@/components/shared/SectionCard";
import type { Transactions } from "@/types";
import {
  BudgetWithTransactions,
  BudgetWithTransactionsAmounts,
} from "@/interfaces";
import CategoryBudgets from "@/components/budgets/CategoryBudgets";
const Budgets = () => {
  /* Rzutowanie przez `unknown`, żeby TS pozwolił bezpiecznie określić strukturę.
  Dane JSON nie mają przypisanego pola _type dlatego unknown*/
  const { budgets } = data as unknown as { budgets: BudgetsType[] };
  //Alternatywa
  /* 
  const budgets: BudgetsType[] = data.budgets.map((budget) => ({
  _type: "Budgets",
  ...budget,
}));
  */
  const { transactions } = data as { transactions: Transactions[] };

  //Kategoria jest identyczna w budżecie i transakcji i wszystkie transakcje o takiej samej kategorii są teraz w jednej tablicy
  const transactionsByCategory: BudgetWithTransactions[] = budgets.map(
    (budget) => ({
      category: budget.category,
      maximum: budget.maximum,
      theme: budget.theme,
      transactions: transactions.filter(
        (transaction) => transaction.category === budget.category
      ),
    })
  );

  //Kategoria jest identyczna w budżecie i transakcji i wszystkie transakcje o takiej samej kategorii są teraz w jednej tablicy (w tym przypadku z transakcji jest tylko zabierane amount, reszta będzie niepotrzebna)
  const budgetsWithTransactionsAmounts: BudgetWithTransactionsAmounts[] =
    budgets.map((budget) => ({
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

  return (
    <section className="grid gap-space-400">
      <div>
        <h1>Budgets</h1>
      </div>
      <div>
        <SectionCard
          className="gap-space-400"
          title="Budgets"
          link="/budgets"
          linkLabel="See Details"
          variant="budgets"
        >
          <BudgetChart
            budgetsWithTransactions={budgetsWithTransactionsAmounts}
            variant="budgets"
          />
          <CategoryBudgets categoryBudgets={transactionsByCategory} />
        </SectionCard>
      </div>
    </section>
  );
};

export default Budgets;
