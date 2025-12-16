import IconRecurringBills from "@/assets/icons/icon-recurring-bills.svg";
const RecurringBills = () => {
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
                $384.98
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
