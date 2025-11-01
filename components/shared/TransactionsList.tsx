import { Transactions } from "@/types";
import TransactionItem from "./TransactionItem";

type TransactionsListProps = {
  transactions: Transactions[];
  variant: "overview" | "budgets";
};

export default function TransactionsList({
  transactions,
  variant,
}: TransactionsListProps) {
  return (
    <ul className="grid gap-space-250">
      {transactions.map((item, i) => (
        <TransactionItem key={i} {...item} variant={variant} />
      ))}
    </ul>
  );
}
