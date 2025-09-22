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
import { formatDate } from "@/utils/formattingFunctions";

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
              <TableRow>
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
                  <TableCell className="!p-space-200">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{formatDate(item.date)}</TableCell>
                  <TableCell align="right">{item.amount.toFixed(2)}</TableCell>
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
