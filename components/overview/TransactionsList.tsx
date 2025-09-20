import { Transactions } from "@/types";
import TransactionItem from "./TransactionItem";

type TransactionsListProps = {
  transactions: Transactions[];
};

export default function TransactionsList({
  transactions,
}: TransactionsListProps) {
  return (
    <ul className="grid gap-space-250">
      {transactions.map((item, i) => (
        <TransactionItem key={i} {...item} />
      ))}
    </ul>
  );
}
