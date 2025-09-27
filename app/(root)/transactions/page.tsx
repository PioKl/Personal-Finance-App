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
} from "@mui/material";
import { formatDate, formatAmount } from "@/utils/formattingFunctions";
import Image from "next/image";

const Transactions = () => {
  const { transactions } = data as { transactions: Transactions[] };

  return (
    <section className="grid gap-space-400">
      <div>
        <h1>Transactions</h1>
      </div>
      <div className="flex flex-col gap-space-250 py-space-300 px-space-250 bg-fill-two rounded-default md:p-space-400 ">
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
