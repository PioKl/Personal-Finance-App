import { Transactions } from "@/types";
import { TransactionWithVariant } from "@/interfaces";
import TransactionItem from "./TransactionItem";

export default function TransactionsList({
  data: transactions,
  variant,
}: TransactionWithVariant<Transactions[]>) {
  return (
    <ul className="grid gap-space-250">
      {transactions.map((transaction, i) => (
        <TransactionItem key={i} data={transaction} variant={variant} />
      ))}
    </ul>
  );
}
