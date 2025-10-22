import data from "@/data/data.json";
import { Budgets as BudgetsType } from "@/types";
import BudgetChart from "@/components/shared/BudgetChart";
import SectionCard from "@/components/shared/SectionCard";
const Budgets = () => {
  const { budgets } = data as { budgets: BudgetsType[] };
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
          <BudgetChart budgets={budgets} variant="budgets" />
        </SectionCard>
      </div>
    </section>
  );
};

export default Budgets;
