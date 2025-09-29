"use client";
import { useState } from "react";
import data from "@/data/data.json";
import type { Transactions } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { formatDate, formatAmount } from "@/utils/formattingFunctions";
import Image from "next/image";
import IconSearch from "@/assets/icons/icon-search.svg";
import IconDown from "@/assets/icons/icon-caret-down.svg";

interface RotatingIconProps {
  className?: string;
}

const Transactions = () => {
  const { transactions } = data as { transactions: Transactions[] };
  //const [selectOpen, setSelectOpen] = useState(false);

  const RotatingIcon = ({ className, ...other }: RotatingIconProps) => {
    return (
      <IconDown
        {...other} // obsługuje kliknięcie selecta i dostępność
        className={`!top-[45%] !right-[16px] transition-transform duration-200 ${className}`}
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

  const cetegorySelectOptions = [
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
  ];

  return (
    <section className="grid gap-space-400">
      <div>
        <h1>Transactions</h1>
      </div>
      <div className="flex flex-col gap-space-250 py-space-300 px-space-250 bg-fill-two rounded-default md:p-space-400 ">
        <div className="flex justify-between">
          <div>
            <TextField
              id="outlined-basic"
              label="Search Transaction"
              variant="outlined"
              className="mui-search mui-label"
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
          <div className="flex gap-space-300">
            <div className="flex items-center gap-space-100">
              <span>Sort by</span>
              <TextField
                select
                defaultValue="Latest"
                className="w-28.5 mui-select"
                slotProps={{
                  select: {
                    IconComponent: RotatingIcon,
                  },
                }}
              >
                {sortSelectOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="flex items-center gap-space-100">
              <span>Category</span>
              <TextField
                select
                defaultValue="All Transactions"
                className="w-44.5 mui-select"
                slotProps={{
                  select: {
                    IconComponent: RotatingIcon,
                  },
                }}
              >
                {cetegorySelectOptions.map((option) => (
                  <MenuItem key={option} value={option}>
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
              {transactions.map((item, index) => (
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
      </div>
    </section>
  );
};

export default Transactions;
