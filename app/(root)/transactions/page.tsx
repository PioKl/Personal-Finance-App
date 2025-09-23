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
                <TableCell className="!p-space-200">
                  Recipient / Sender
                </TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Transaction Date</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {transactions.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="!p-space-200 mui-cell-one">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{formatDate(item.date)}</TableCell>
                  <TableCell
                    align="right"
                    className={`mui-amount ${
                      item.amount > 0
                        ? "mui-amount-positive"
                        : "mui-amount-negative"
                    }`}
                  >
                    {formatAmount(item.amount)}
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
