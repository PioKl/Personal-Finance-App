"use client";
import data from "@/data/data.json";
import Image from "next/image";
import { Balance, Pots, Transactions, Budgets } from "@/types";
import {
  priceDollarsFormatting,
  formatData,
  formatAmount,
} from "@/utils/formattingFunctions";
import Button from "@/components/ui/Button";
import IconCaretRight from "@/assets/icons/icon-caret-right.svg";
import IconPot from "@/assets/icons/icon-pot.svg";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

/* export const metadata = {
  title: "Overview",
}; */

export default function Home() {
  //const { balance, pots } = data as { balance: Balance; pots: Pots[] };
  const { balance } = data as { balance: Balance };
  const { pots } = data as { pots: Pots[] };
  const { transactions } = data as { transactions: Transactions[] };
  const { budgets } = data as { budgets: Budgets[] };
  const potsSlice = pots.slice(0, 4);
  const transactionsSlice = transactions.slice(0, 5);
  const budgetsLabels = budgets.map((item) => item.category);
  const budgetsMaximum = budgets.map((item) => item.maximum);
  const budgetsTheme = budgets.map((item) => item.theme);

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
  };

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
            <div className="grid gap-space-250 py-space-300 px-space-250 bg-fill-two rounded-default md:p-space-400">
              <div className="flex items-end justify-between">
                <h2>Pots</h2>
                <Button
                  variant="link"
                  isALink={true}
                  link="/pots"
                  className="flex items-center gap-space-150"
                >
                  See Details
                  <IconCaretRight />
                </Button>
              </div>
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
                <ul className="grid grid-cols-2 gap-space-200 md:flex-1">
                  {potsSlice.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-space-200 [&:nth-child(3)]:col-start-2 [&:nth-child(3)]:row-start-1 before:content-[''] before:w-1 [&:nth-child(1)]:before:bg-pots-one [&:nth-child(2)]:before:bg-pots-three [&:nth-child(3)]:before:bg-pots-two [&:nth-child(4)]:before:bg-pots-four before:rounded-default"
                    >
                      <div className="grid gap-space-50">
                        <span className="text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5 text-color-three">
                          {item.name}
                        </span>
                        <span className="text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4-bold text-color-one">
                          ${item.total}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-space-400 py-space-300 px-space-250 bg-fill-two rounded-default md:p-space-400">
              <div className="flex w-full items-end justify-between">
                <h2>Transactions</h2>
                <Button
                  variant="link"
                  isALink={true}
                  link="/transactions"
                  className="flex items-center gap-space-150"
                >
                  View All
                  <IconCaretRight />
                </Button>
              </div>
              <ul className="grid gap-space-250">
                {transactionsSlice.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between pb-space-250 border-b-1 border-default"
                  >
                    <div className="flex items-center gap-space-200">
                      <div className="relative w-8 h-8 md:w-10 md:h-10">
                        <Image
                          src={item.avatar.replace("./", "/")}
                          alt={item.name}
                          fill
                          className="rounded-full object-cover"
                          sizes="(min-width: 768px) 40px, 32px"
                        />
                      </div>
                      <span className="text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4-bold">
                        {item.name}
                      </span>
                    </div>

                    <div className="grid gap-space-100">
                      <span
                        className={`
                      text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4-bold
                      ${item.amount >= 0 ? "text-amount" : "text-amount-alt"}
                    `}
                      >
                        {formatAmount(item.amount)}
                      </span>
                      <span className="text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5 text-date">
                        {formatData(item.date)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-space-400">
            <div className="flex flex-col gap-space-400 py-space-300 px-space-250 bg-fill-two rounded-default md:p-space-400">
              <div className="flex w-full items-end justify-between">
                <h2>Budgets</h2>
                <Button
                  variant="link"
                  isALink={true}
                  link="/budgets"
                  className="flex items-center gap-space-150"
                >
                  See Details
                  <IconCaretRight />
                </Button>
              </div>
              <div className="flex flex-col gap-space-250 md:flex-row lg:flex-col xl:flex-row">
                <div className="relative justify-items-center md:ml-auto">
                  <div className="w-[240px] h-[240px] pointer-events-none">
                    <div className="pointer-events-auto">
                      <Doughnut data={chartData} options={options} />
                    </div>
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-space-200 md:ml-auto md:grid-cols-1 lg:grid-cols-2 lg:ml-0 xl:grid-cols-1 xl:ml-auto">
                  {budgets.map((item, index) => (
                    <li key={index} className="flex gap-space-200">
                      <span
                        className="w-1 rounded-default"
                        style={{ backgroundColor: item.theme }}
                      />
                      <div className="grid gap-space-50">
                        <span className="text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5 text-color-three">
                          {item.category}
                        </span>
                        <span className="text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4-bold text-color-one">
                          ${priceDollarsFormatting(item.maximum)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
