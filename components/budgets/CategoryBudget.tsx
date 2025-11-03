import React from "react";
import { BudgetWithTransactions } from "@/interfaces";
import IconEllipsis from "@/assets/icons/icon-ellipsis.svg";
import IconCaretRight from "@/assets/icons/icon-caret-right.svg";
import { priceDollarsFormatting } from "@/utils/formattingFunctions";
import Button from "../ui/Button";
import TransactionsList from "../shared/TransactionsList";

export default function CategoryBudget({
  category,
  maximum,
  theme,
  transactions,
}: BudgetWithTransactions) {
  const amountSpent = transactions.reduce((sum, { amount }) => sum + amount, 0); //0 to wartość początkowa akumulatura, czyli sum
  const amountSpentInPercent = ((amountSpent * -1) / maximum) * 100;
  const spentAndFree = [
    {
      id: 0,
      name: "Spent",
      amount: priceDollarsFormatting(amountSpent, true),
    },
    {
      id: 1,
      name: "Free",
      amount: maximum,
    },
  ];
  return (
    <div className="grid gap-space-250 py-space-300 px-space-250 md:p-space-400 bg-fill-two rounded-default">
      <div className="flex justify-between">
        <h2
          className={`flex items-center gap-space-200 before:content-[''] before:w-4 before:h-4 before:bg-[var(--theme-color)] before:rounded-default`}
          style={{ "--theme-color": theme } as React.CSSProperties}
        >
          {category}
        </h2>
        <button>
          <IconEllipsis />
        </button>
      </div>
      <div className="grid gap-space-200">
        <span className="text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 text-color-three">
          Maximum of ${priceDollarsFormatting(maximum)}
        </span>
        <div className="relative w-full h-8 p-1 bg-fill-three rounded-small">
          <div
            className="absolute w-[calc(var(--spent-percent)-8px)] h-6 bg-[var(--theme-color)] rounded-small"
            style={
              {
                "--theme-color": theme,
                "--spent-percent": `${Math.min(amountSpentInPercent, 100)}%`,
              } as React.CSSProperties
            }
          ></div>
          {/* Math.min, druga wartość tam gdzie 100 oznacza ograniczenie do 100 tylko max tyle może osiągnać */}
        </div>
        <ul className="flex">
          {spentAndFree.map((item) => (
            <li
              key={item.id}
              className="flex flex-1 gap-space-200 before:content-[''] before:w-1 before:bg-[var(--theme-color)] before:rounded-default"
              style={{ "--theme-color": theme } as React.CSSProperties}
            >
              <div className="grid">
                <span className="text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5 text-color-three">
                  {item.name}
                </span>
                <span className="text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4-bold text-color-one">
                  ${item.amount}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-space-250 p-space-200 bg-fill-three rounded-default md:p-space-250">
        <div className="flex items-end justify-between">
          <h2>Latest Spending</h2>

          <Button
            variant="link"
            isALink={true}
            link="/transactions"
            className="flex items-center gap-space-150"
          >
            See All
            <IconCaretRight />
          </Button>
        </div>
        <TransactionsList data={transactions} variant="budgets" />
      </div>
    </div>
  );
}
