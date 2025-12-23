import IconRecurringBills from "@/assets/icons/icon-recurring-bills.svg";
import data from "@/data/data.json";
import { balance, transactions, budgets, pots } from "@/data/data.json";
const RecurringBills = () => {
  const recurringBills = data.transactions.filter(
    (item) =>
      item.recurring === true &&
      (item.date.charAt(6) === "8" || item.date.substring(8, 10) > "19")

    /* charAt(6)
    date = "2025-08-23";
    0 1 2 3 4 5 6 7 8 9
    2 0 2 5 - 0 8 - 2 3
                ↑
                6
    */
    /* 
      item.date.substring(8, 10) > "19"
      0 1 2 3 4 5 6 7 8 9
      2 0 2 5 - 0 8 - 2 3
                      ↑ ↑
                      8 9
      */
  );
  const recurringBillsSum = recurringBills
    .map((item) => item.amount)
    .reduce((a, b) => a + b, 0);

  return (
    <section className="grid gap-space-400">
      <div className="flex items-center justify-between">
        <h1>Recurring Bills</h1>
      </div>
      <div>
        <div>
          <div className="flex items-center rounded-default gap-space-250 px-space-250 py-space-300 bg-fill-one">
            <IconRecurringBills />
            <div className="grid gap-space-150 text-color-two">
              <span className="text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4">
                Total Bills
              </span>
              <span className="text-preset-1 tracking-preset-1 leading-preset-1 font-preset-1">
                ${Math.abs(recurringBillsSum)}
              </span>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default RecurringBills;
