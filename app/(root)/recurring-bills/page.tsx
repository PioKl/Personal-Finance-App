"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import clsx from "clsx";
import IconRecurringBills from "@/assets/icons/icon-recurring-bills.svg";
import IconSearch from "@/assets/icons/icon-search.svg";
import IconDown from "@/assets/icons/icon-caret-down.svg";
import IconSortMobile from "@/assets/icons/icon-sort-mobile.svg";
import IconBillDue from "@/assets/icons/icon-bill-due.svg";
import IconBillPaid from "@/assets/icons/icon-bill-paid.svg";
import data from "@/data/data.json";
import {
  priceDollarsFormatting,
  formatDateOrdinalIndicators,
} from "@/utils/formattingFunctions";
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
import { useBreakpoint } from "@/utils/breakpoints";

interface RotatingIconProps {
  className?: string;
}

interface IconSortProps {
  className?: string;
}

const RecurringBills = () => {
  const { transactions } = data;

  //Due soon 5 dni do przodu od ostatniej transakcji
  //total upcoming wszystkie w przyszlosci, czyli wszystkie nadchodzące czyli na podstawie tych powtarzajacych sie z lipca mozna przyjac, ze wszystkie po dacie 19 z lipca beda tez to zaplaty w sierpniu dlatego total upcoming to item.date.substring(8, 10) > "19"

  const latestTransaction = transactions[0].date.substring(8, 10); //wyciągnięcie samego dnia
  /* 
      date.substring(8, 10)
      0 1 2 3 4 5 6 7 8 9
      2 0 2 5 - 0 8 - 1 9
                      ↑ ↑
                      8 9
      */

  const paidBills = transactions.filter(
    (item) => item.recurring === true && item.date.charAt(6) === "8",
    /*Dany miesiąc, tu chodzi o sierpień
    charAt(6)
    date = "2025-08-23";
    0 1 2 3 4 5 6 7 8 9
    2 0 2 5 - 0 8 - 2 3
                ↑
                6
    */
  );

  // Daty paidBills, potrzebne przy has, bo Set działa tylko przy has
  const paidBillsDates = new Set(paidBills.map((item) => item.date));

  const totalUpcoming = transactions.filter(
    (item) =>
      item.recurring === true &&
      Number(item.date.substring(8, 10)) > Number(latestTransaction),
  );

  //zakres, ze od ostatniej transkacji 5 dni max do przodu
  const dueSoon = transactions.filter(
    (item) =>
      item.recurring === true &&
      Number(item.date.substring(8, 10)) > Number(latestTransaction) &&
      Number(item.date.substring(8, 10)) <= Number(latestTransaction) + 5,
  );

  // Daty dueSoon, potrzebne przy has, bo Set działa tylko przy has
  const dueSoonDates = new Set(dueSoon.map((item) => item.date));

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
  const recurringBills = transactions.filter(
    (item) =>
      item.recurring === true &&
      (item.date.charAt(6) === "8" || item.date.substring(8, 10) > "19"),
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
        true,
      )})`,
    },
    {
      name: "Total Upcoming",
      value: `${totalUpcoming.length} ($${priceDollarsFormatting(
        totalUpcomingSum,
        true,
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

  const RotatingIcon = ({ className, ...other }: RotatingIconProps) => {
    return (
      <IconDown
        {...other} // obsługuje kliknięcie selecta i dostępność
        className={`!top-[45%] !right-[16px] transition-transform duration-200 ${className}`}
      />
    );
  };

  const IconSort = ({ className, ...other }: IconSortProps) => {
    return (
      <IconSortMobile
        {...other}
        className={`!right-[11px] ${className}`}
        style={{ transform: "none" }} // nadpisuje inline transform od MUI
      />
    );
  };

  const { isMdUp } = useBreakpoint();

  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState(sortSelectOptions[0].value);

  const handleSearchBills = (value: string) => {
    setSearchValue(value);
  };

  const handleSortBy = (value: string) => {
    setSortValue(value);
  };

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
          return a.amount - b.amount;
        case "Lowest":
          return b.amount - a.amount;
        default:
          return 0;
      }
    });
    return sorted;
  }, [recurringBills, searchValue, sortValue]);

  return (
    <section className="grid gap-space-400">
      <div className="flex items-center justify-between">
        <h1>Recurring Bills</h1>
      </div>
      <div className="flex flex-col gap-space-300 xl:flex-row">
        <div className="flex flex-col gap-space-150 h-fit md:flex-row md:gap-space-300 xl:flex-col lg:min-w-[337px]">
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
        <div className="flex flex-col flex-1 py-space-300 px-space-250 bg-fill-two rounded-default">
          <div className="flex justify-between gap-space-300">
            <div>
              <TextField
                id="outlined-basic"
                label="Search Bills"
                variant="outlined"
                className="mui-search mui-label"
                onChange={(e) => {
                  handleSearchBills(e.target.value);
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconSearch />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
            <div className="flex md:gap-space-300">
              <div className="flex items-center gap-space-100">
                <span className="hidden text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 text-color-three whitespace-nowrap md:flex">
                  Sort by
                </span>
                <TextField
                  select
                  defaultValue={sortSelectOptions[0].value}
                  value={sortValue}
                  onChange={(e) => {
                    handleSortBy(e.target.value);
                  }}
                  className={clsx(
                    "mui-select",
                    isMdUp ? "w-28.5" : "mui-select-mobile",
                  )}
                  slotProps={{
                    select: {
                      IconComponent: isMdUp ? RotatingIcon : IconSort,
                      renderValue: () => (isMdUp ? sortValue : null),
                    },
                  }}
                >
                  {sortSelectOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      autoFocus={false}
                      disableRipple //wyłączenie pojawiania się wypełnienia tła kolorem przy kliknięciu na przycisk
                      className="!text-preset-4 !tracking-preset-4 !leading-preset-4 !font-preset-4 !text-color-one [&.Mui-selected]:!font-preset-4-bold !border-b-1 !border-default !px-0 !py-space-150 [&.Mui-selected]:!bg-transparent [&.Mui-selected:hover]:!bg-transparent hover:!bg-transparent hover:!font-preset-4-bold focus-within:!bg-transparent focus-within:!font-preset-4-bold"
                    >
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className="[&>th]:!text-preset-5 [&>th]:!tracking-preset-5 [&>th]:!leading-preset-5 [&>th]:!font-preset-5 [&>th]:!text-color-three">
                  <TableCell className="!hidden md:!table-cell md:!p-space-200">
                    Bill Title
                  </TableCell>
                  <TableCell className="!hidden md:!table-cell">
                    Due Date
                  </TableCell>
                  <TableCell align="right" className="!hidden md:!table-cell">
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredAndSortedTransactions.map((item, index) => {
                  const isDueSoon = dueSoonDates.has(item.date);
                  const isPaidBill = paidBillsDates.has(item.date);
                  return (
                    <TableRow key={index}>
                      <TableCell className="!p-space-200 mui-cell-one">
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
                          <div className="flex flex-col">
                            <span>{item.name}</span>
                            <div className="flex items-end gap-space-100 md:!hidden">
                              <span className="mui-mobile-text-positive">
                                Monthly-{Number(item.date.substring(8, 10))}
                                {formatDateOrdinalIndicators(
                                  Number(item.date.substring(8, 10)),
                                )}
                              </span>
                              {isDueSoon && (
                                <span>
                                  <IconBillDue />
                                </span>
                              )}
                              {isPaidBill && (
                                <span>
                                  <IconBillPaid />
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="!hidden md:!table-cell mui-amount-positive">
                        <div className="flex items-end gap-space-100">
                          <span>
                            Monthly-{Number(item.date.substring(8, 10))}
                            {formatDateOrdinalIndicators(
                              Number(item.date.substring(8, 10)),
                            )}
                          </span>
                          {isDueSoon && (
                            <span>
                              <IconBillDue />
                            </span>
                          )}
                          {isPaidBill && (
                            <span>
                              <IconBillPaid />
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell
                        align="right"
                        className={`mui-amount ${
                          isDueSoon
                            ? "mui-amount-due-soon"
                            : "mui-amount-negative"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span>
                            ${priceDollarsFormatting(item.amount, true)}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </section>
  );
};

export default RecurringBills;
