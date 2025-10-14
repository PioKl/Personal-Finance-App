"use client";
import { useMemo, useState, useEffect } from "react";
import clsx from "clsx";
import data from "@/data/data.json";
import type { Transactions } from "@/types";
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
import { formatDate, formatAmount } from "@/utils/formattingFunctions";
import Image from "next/image";
import IconSearch from "@/assets/icons/icon-search.svg";
import IconDown from "@/assets/icons/icon-caret-down.svg";
import IconFilterMobile from "@/assets/icons/icon-filter-mobile.svg";
import IconSortMobile from "@/assets/icons/icon-sort-mobile.svg";
import CustomPagination from "@/components/ui/CustomPagination";
import { useBreakpoint } from "@/utils/breakpoints";

interface RotatingIconProps {
  className?: string;
}

interface IconFilterProps {
  className?: string;
}

interface IconSortProps {
  className?: string;
}

const Transactions = () => {
  const { transactions } = data as { transactions: Transactions[] };

  const RotatingIcon = ({ className, ...other }: RotatingIconProps) => {
    return (
      <IconDown
        {...other} // obsługuje kliknięcie selecta i dostępność
        className={`!top-[45%] !right-[16px] transition-transform duration-200 ${className}`}
      />
    );
  };

  const IconFilter = ({ className, ...other }: IconFilterProps) => {
    return (
      <IconFilterMobile
        {...other}
        className={`!right-[11px] ${className}`}
        style={{ transform: "none" }} // nadpisuje inline transform od MUI
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

  const categorySelectOptions = useMemo(
    () => [
      "All Transactions",
      "Entertainment",
      "Bills",
      "Personal Care",
      "Transportation",
      "General",
      "Dining Out",
      "Shopping",
      "Lifestyle",
      "Education",
      "Groceries",
    ],
    []
  );

  const { isMdUp } = useBreakpoint();

  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState(sortSelectOptions[0].value);
  const [categoryValue, setCategoryValue] = useState(categorySelectOptions[0]);

  const handleSearchTransactions = (value: string) => {
    setSearchValue(value);
  };

  const handleSortBy = (value: string) => {
    setSortValue(value);
  };

  const handleCategory = (value: string) => {
    setCategoryValue(value);
  };

  const filteredAndSortedTranscations = useMemo(() => {
    const filteredTransactions = transactions.filter((item) => {
      const nameMatches = item.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const categoryMatches =
        categoryValue === categorySelectOptions[0] ||
        item.category.toLowerCase().includes(categoryValue.toLowerCase());

      return nameMatches && categoryMatches;
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
  }, [
    transactions,
    searchValue,
    sortValue,
    categoryValue,
    categorySelectOptions,
  ]);

  const [page, setPage] = useState(1);
  const transactionsPerPage = 10;
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const filteredWithPaginationTransactions = useMemo(() => {
    const start = (page - 1) * transactionsPerPage;
    const end = page * transactionsPerPage;
    return filteredAndSortedTranscations.slice(start, end);
  }, [page, filteredAndSortedTranscations]);

  //Powrót na pierwszą stronę po wyszukiwaniu, przefiltrowaniu, sortowaniu
  useEffect(() => {
    setPage(1);
  }, [filteredAndSortedTranscations]);

  return (
    <section className="grid gap-space-400">
      <div>
        <h1>Transactions</h1>
      </div>
      <div className="flex flex-col gap-space-400 py-space-300 px-space-250 bg-fill-two rounded-default md:p-space-400 ">
        <div className="flex justify-between gap-space-300">
          <div>
            <TextField
              id="outlined-basic"
              label="Search Transaction"
              variant="outlined"
              className="mui-search mui-label"
              onChange={(e) => {
                handleSearchTransactions(e.target.value);
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
                  isMdUp ? "w-28.5" : "mui-select-mobile"
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
                  >
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="flex items-center gap-space-100">
              <span className="hidden text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 text-color-three md:flex">
                Category
              </span>
              <TextField
                select
                defaultValue={categorySelectOptions[0]}
                value={categoryValue}
                onChange={(e) => {
                  handleCategory(e.target.value);
                }}
                className={clsx(
                  "mui-select",
                  isMdUp ? "w-44.5" : "mui-select-mobile"
                )}
                slotProps={{
                  select: {
                    IconComponent: isMdUp ? RotatingIcon : IconFilter,
                    renderValue: () => (isMdUp ? categoryValue : null),
                  },
                }}
              >
                {categorySelectOptions.map((option) => (
                  <MenuItem key={option} value={option} autoFocus={false}>
                    {option}
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
                  Recipient / Sender
                </TableCell>
                <TableCell className="!hidden md:!table-cell">
                  Category
                </TableCell>
                <TableCell className="!hidden md:!table-cell">
                  Transaction Date
                </TableCell>
                <TableCell align="right" className="!hidden md:!table-cell">
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredWithPaginationTransactions.map((item, index) => (
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
                        <span className="mui-mobile-text md:!hidden">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="!hidden md:!table-cell">
                    {item.category}
                  </TableCell>
                  <TableCell className="!hidden md:!table-cell">
                    {formatDate(item.date)}
                  </TableCell>
                  <TableCell
                    align="right"
                    className={`mui-amount ${
                      item.amount > 0
                        ? "mui-amount-positive"
                        : "mui-amount-negative"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span>{formatAmount(item.amount)}</span>
                      <span className="mui-mobile-text md:!hidden">
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination
          count={Math.ceil(
            filteredAndSortedTranscations.length / transactionsPerPage
          )}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </section>
  );
};

export default Transactions;
