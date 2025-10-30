"use client";
import { priceDollarsFormatting } from "@/utils/formattingFunctions";
import { Budgets } from "@/types";
import { BudgetWithTransactionsAmounts } from "@/interfaces";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

type BudgetChartProps =
  | {
      variant: "default";
      budgets: Budgets[];
      budgetsWithTransactions?: never;
    }
  | {
      variant: "budgets";
      budgetsWithTransactions: BudgetWithTransactionsAmounts[]; //transakcje wbudowane w "budgets", a dokładnie same amount w tym przypadku
      budgets?: never;
    };

export default function BudgetChart(props: BudgetChartProps) {
  const { variant } = props;

  let budgetsLabels: string[];
  let budgetsMaximum: number[];
  let budgetsTheme: string[];
  let budgetsItems: (Budgets | BudgetWithTransactionsAmounts)[] = [];
  let budgetsAmount: number[] = [];

  if (variant === "budgets") {
    const { budgetsWithTransactions } = props;

    budgetsLabels = budgetsWithTransactions.map((b) => b.category);
    budgetsMaximum = budgetsWithTransactions.map((b) => b.maximum);
    budgetsTheme = budgetsWithTransactions.map((b) => b.theme);
    budgetsItems = budgetsWithTransactions;
    budgetsAmount = budgetsWithTransactions.map((budget) =>
      budget.transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      )
    );
  } else {
    const { budgets } = props;
    budgetsLabels = budgets.map((b) => b.category);
    budgetsMaximum = budgets.map((b) => b.maximum);
    budgetsTheme = budgets.map((b) => b.theme);
    budgetsItems = budgets;
  }

  const chartData = {
    labels: budgetsLabels,
    datasets: [
      {
        data: budgetsMaximum,
        backgroundColor: budgetsTheme,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "66%",
  };

  return (
    <div
      className={`flex flex-col ${
        variant === "budgets" ? "gap-13 md:items-center" : "gap-space-250"
      } md:flex-row xl:flex-row`}
    >
      <div
        className={`relative ${
          variant === "budgets"
            ? "mx-auto md:ml-7 md:mr-15"
            : "justify-items-center md:mx-auto"
        }`}
      >
        <div className={`w-[240px] h-[240px] pointer-events-none`}>
          <div className="pointer-events-auto">
            <Doughnut data={chartData} options={options} />
          </div>
          <div className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[187.5px] h-[187.5px] bg-white/25 rounded-full">
            <span className="text-preset-1 tracking-preset-1 leading-preset-1 font-preset-1 text-color-one">
              $338
            </span>
            <span className="text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5 text-color-three">
              of ${budgetsMaximum.reduce((a, b) => a + b, 0)} limit
            </span>
          </div>
        </div>
      </div>
      <div
        className={`grid gap-space-300 ${variant === "budgets" && "w-full"}`}
      >
        {variant === "budgets" && <h2>Spending Summary</h2>}
        <ul
          className={`grid grid-cols-${
            variant === "budgets" ? "1" : "2 md:ml-auto"
          } gap-space-200 md:grid-cols-1 xl:grid-cols-1`}
        >
          {budgetsItems.map((item, index) => (
            <li
              key={index}
              className={`flex gap-space-200 ${
                variant === "budgets" &&
                "pb-4 border-b border-default last:border-b-0"
              }`}
            >
              <span
                className={`${
                  variant === "budgets" && "min-w-1"
                } w-1 rounded-default`}
                style={{ backgroundColor: item.theme }}
              />
              <div
                className={`${
                  variant === "budgets" ? "flex w-full items-center" : "grid"
                } gap-space-50`}
              >
                <span className="text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5 text-color-three">
                  {item.category}
                </span>
                <div
                  className={`${
                    variant === "budgets" &&
                    "flex items-center gap-space-100 ml-auto justify-end flex-wrap"
                  }`}
                >
                  <span
                    className={`text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4-bold text-color-one`}
                  >
                    {variant === "budgets"
                      ? `$${priceDollarsFormatting(budgetsAmount[index], true)}`
                      : `$${priceDollarsFormatting(item.maximum)}`}
                  </span>
                  {variant === "budgets" && (
                    <div className="flex gap-space-50 text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5 text-color-three">
                      <span>of</span>
                      <span>${priceDollarsFormatting(item.maximum)}</span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
