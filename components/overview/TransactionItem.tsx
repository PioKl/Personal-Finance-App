import { Transactions } from "@/types";
import Image from "next/image";
import { formatAmount, formatData } from "@/utils/formattingFunctions";

export default function TransactionItem({
  avatar,
  name,
  amount,
  date,
}: Transactions) {
  return (
    <li className="flex justify-between pb-space-250 border-b-1 border-default">
      <div className="flex items-center gap-space-200">
        <div className="relative w-8 h-8 md:w-10 md:h-10">
          <Image
            src={avatar.replace("./", "/")}
            alt={name}
            fill
            className="rounded-full object-cover"
            sizes="(min-width: 768px) 40px, 32px"
          />
        </div>
        <span className="text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4-bold">
          {name}
        </span>
      </div>

      <div className="grid gap-space-100">
        <span
          className={`text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4-bold ${
            amount >= 0 ? "text-amount" : "text-amount-alt"
          }`}
        >
          {formatAmount(amount)}
        </span>
        <span className="text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5 text-date">
          {formatData(date)}
        </span>
      </div>
    </li>
  );
}
