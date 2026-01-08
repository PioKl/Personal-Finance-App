"use client";
import { useState, useMemo } from "react";
import IconRecurringBills from "@/assets/icons/icon-recurring-bills.svg";
import data from "@/data/data.json";
import { balance, transactions, budgets, pots } from "@/data/data.json";
import { priceDollarsFormatting } from "@/utils/formattingFunctions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";

const RecurringBills = () => {
  //Do poprawki
  //paid bills to po prostu zaplacone te z sierpnia juz przed data 19
  //Due soon 5 dni do przodu od ostatniej transakcji
  //total upcoming wszystkie w przyszlosci, czyli wszystkie nadchodzące czyli na podstawie tych powtarzajacych sie z lipca mozna przyjac, ze wszystkie po dacie 19 z lipca beda tez to zaplaty w sierpniu dlatego total upcoming to item.date.substring(8, 10) > "19"

  const latestTransaction = data.transactions[0].date.substring(8, 10); //wyciągnięcie samego dnia
  /* 
      date.substring(8, 10)
      0 1 2 3 4 5 6 7 8 9
      2 0 2 5 - 0 8 - 1 9
                      ↑ ↑
                      8 9
      */

  const paidBills = data.transactions.filter(
    (item) => item.recurring === true && item.date.charAt(6) === "8"
    /*Dany miesiąc, tu chodzi o sierpień
    charAt(6)
    date = "2025-08-23";
    0 1 2 3 4 5 6 7 8 9
    2 0 2 5 - 0 8 - 2 3
                ↑
                6
    */
  );
  const totalUpcoming = data.transactions.filter(
    (item) =>
      item.recurring === true && item.date.substring(8, 10) > latestTransaction
  );

  //zakres, ze od ostatniej transkacji 5 dni max do przodu
  const dueSoon = data.transactions.filter(
    (item) =>
      item.recurring === true &&
      item.date.substring(8, 10) > latestTransaction &&
      item.date.substring(8, 10) <= (Number(latestTransaction) + 5).toString()
  );

  const paidBillsSum = paidBills
    .map((item) => item.amount)
    .reduce((a, b) => a + b, 0);

  const totalUpcomingSum = totalUpcoming
    .map((item) => item.amount)
    .reduce((a, b) => a + b, 0);

  const dueSoonSum = dueSoon
    .map((item) => item.amount)
    .reduce((a, b) => a + b, 0);

  //to jest połączenie paidBills i totalUpcoming
  const recurringBills = data.transactions.filter(
    (item) =>
      item.recurring === true &&
      (item.date.charAt(6) === "8" || item.date.substring(8, 10) > "19")
    /* 
     - Show the recurring transactions that have already been paid for August 2024.
     - Show the payments due to be paid soon based on their monthly payment date. Calculate this from recurring transactions yet to be paid for August 2024, but due within five days of the latest overall transaction in the app (Emma Richardson - 19 August 2024).
    */
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

  const summaryListItems = [
    {
      name: "Paid Bills",
      value: `${paidBills.length} ($${priceDollarsFormatting(
        paidBillsSum,
        true
      )})`,
    },
    {
      name: "Total Upcoming",
      value: `${totalUpcoming.length} ($${priceDollarsFormatting(
        totalUpcomingSum,
        true
      )})`,
    },
    {
      name: "Due Soon",
      value: `${dueSoon.length} ($${priceDollarsFormatting(dueSoonSum, true)})`,
    },
  ];

  /* Transakcje, wyszukiwanie, sortowanie */
  const sortSelectOptions = [
    {
      value: "Latest",
    },
    {
      value: "Oldest",
    },
    {
      value: "A to Z",
    },
    {
      value: "Z to A",
    },
    {
      value: "Highest",
    },
    {
      value: "Lowest",
    },
  ];

  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState(sortSelectOptions[0].value);

  const filteredAndSortedTransactions = useMemo(() => {
    const filteredTransactions = recurringBills.filter((item) => {
      const nameMatches = item.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      return nameMatches;
    });

    const sorted = [...filteredTransactions].sort((a, b) => {
      switch (sortValue) {
        case "Latest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "Oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "A to Z":
          return a.name.localeCompare(b.name);
        case "Z to A":
          return b.name.localeCompare(a.name);
        case "Highest":
          return b.amount - a.amount;
        case "Lowest":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });
    return sorted;
  }, [recurringBills, searchValue, sortValue]);

  console.log(filteredAndSortedTransactions);

  return (
    <section className="grid gap-space-400">
      <div className="flex items-center justify-between">
        <h1>Recurring Bills</h1>
      </div>
      <div className="flex flex-col gap-space-300 lg:flex-row">
        <div className="flex flex-col gap-space-150 md:flex-row md:gap-space-300 lg:flex-col lg:min-w-[337px]">
          <div className="flex flex-1 items-center rounded-default gap-space-250 px-space-250 py-space-300 bg-fill-one md:flex-col md:items-start md:justify-end md:gap-space-400 lg:justify-start">
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

          <div className="flex flex-1 flex-col gap-space-250 px-space-250 py-space-300 rounded-default bg-fill-two">
            <h2 className="text-preset-3 tracking-preset-3 leading-preset-3 font-preset-3">
              Summary
            </h2>
            <ul className="flex flex-col gap-space-200">
              {summaryListItems.map(({ name, value }) => (
                <li
                  key={name}
                  className="flex justify-between pb-space-200 border-b-1 border-default last:border-0 last:pb-0 last:[&>span]:text-color-red"
                >
                  <span className="text-color-three text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5">
                    {name}
                  </span>
                  <span className="text-color-one text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5-bold">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-1 bg-fill-two">
          <h1>Placeholder</h1>
        </div>
      </div>
    </section>
  );
};

export default RecurringBills;
