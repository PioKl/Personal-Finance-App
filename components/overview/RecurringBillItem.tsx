import { RecurringBillItem as RecurringBillItemType } from "@/types";
import { priceDollarsFormatting } from "@/utils/formattingFunctions";

export default function RecurringBillItem({
  label,
  value,
  borderColorClass,
}: RecurringBillItemType) {
  return (
    <li
      className={`flex justify-between px-space-200 py-space-250 text-preset-4 tracking-preset-4 leading-preset-4 bg-fill-three rounded-alt border-l-4 ${borderColorClass}`}
    >
      <span className="text-color-three">{label}</span>
      <span className="font-preset-4-bold text-color-one">
        ${priceDollarsFormatting(value)}
      </span>
    </li>
  );
}
