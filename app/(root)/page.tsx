import data from "@/data/data.json";
import { Balance, Pots, Transactions, Budgets } from "@/types";
import { priceDollarsFormatting } from "@/utils/formattingFunctions";
import IconPot from "@/assets/icons/icon-pot.svg";
import SectionCard from "@/components/shared/SectionCard";
import BudgetChart from "@/components/shared/BudgetChart";
import RecurringBillItem from "@/components/overview/RecurringBillItem";
import TransactionsList from "@/components/overview/TransactionsList";
import PotsList from "@/components/overview/PotsList";

export const metadata = {
  title: "Overview",
};

export default function Home() {
  const { balance, pots } = data as { balance: Balance; pots: Pots[] };
  const { transactions } = data as { transactions: Transactions[] };
  /* Rzutowanie przez "unknown", żeby TS pozwolił bezpiecznie określić strukturę.
  Dane JSON nie mają przypisanego pola _type dlatego unknown*/
  const { budgets } = data as unknown as { budgets: Budgets[] };
  const potsSlice = pots.slice(0, 4);
  const transactionsSlice = transactions.slice(0, 5);

  return (
    <>
      <section className="grid gap-space-400">
        <div>
          <h1>Overview</h1>
        </div>
        <div className="flex flex-col gap-space-150 md:flex-row md:gap-space-300">
          {Object.entries(balance).map(([key, value], index) => (
            <div
              key={key}
              className={`grid gap-space-150 flex-1 p-space-300 rounded-default first:bg-fill-one bg-fill-two first:text-color-two text-color-three`}
            >
              <span className="capitalize font-preset-4 text-preset-4 leading-preset-4 tracking-preset-4">
                {key === "current" ? `${key} Balance` : key}
              </span>
              <span
                className={`font-preset-1 text-preset-1 leading-preset-1 tracking-preset-1 ${
                  index === 0 ? "text-color-two" : "text-color-one"
                }`}
              >
                ${priceDollarsFormatting(value)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-space-400 xl:flex-row">
          <div className="grid gap-space-400 xl:flex-1">
            <SectionCard
              title="Pots"
              link="/pots"
              linkLabel="See Details"
              variant="default"
            >
              <div className="flex flex-col gap-space-250 md:flex-row">
                <div className="flex items-center gap-space-200 py-5 px-4 bg-fill-three rounded-default md:pr-[clamp(1rem,-35rem+45vw,5.5rem)]">
                  <IconPot />
                  <div className="grid gap-3">
                    <span className="text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 text-color-three">
                      Total Saved
                    </span>
                    <span className="text-preset-1 tracking-preset-1 leading-preset-1 font-preset-1 text-color-one">
                      $850
                    </span>
                  </div>
                </div>
                <PotsList pots={potsSlice} />
              </div>
            </SectionCard>

            <SectionCard
              className="gap-space-400"
              title="Transactions"
              link="/transactions"
              linkLabel="View All"
              variant="default"
            >
              <TransactionsList transactions={transactionsSlice} />
            </SectionCard>
          </div>
          <div className="grid gap-space-400">
            <SectionCard
              className="gap-space-400"
              title="Budgets"
              link="/budgets"
              linkLabel="See Details"
              variant="default"
            >
              <BudgetChart budgets={budgets} variant="default" />
            </SectionCard>

            <SectionCard
              className="gap-space-400"
              title="Recurring Bills"
              link="/recurring-bills"
              linkLabel="See Details"
              variant="default"
            >
              <ul className="grid gap-space-150">
                <RecurringBillItem
                  label="Paid Bills"
                  value={190}
                  borderColorClass="border-l-pots-one"
                />
                <RecurringBillItem
                  label="Total Upcoming"
                  value={194.98}
                  borderColorClass="border-l-pots-four"
                />
                <RecurringBillItem
                  label="Due Soon"
                  value={59.98}
                  borderColorClass="border-l-pots-two"
                />
              </ul>
            </SectionCard>
          </div>
        </div>
      </section>
    </>
  );
}
