import { Pots } from "@/types";

export default function PotsItem({ name, total }: Pots) {
  return (
    <li className="flex gap-space-200 [&:nth-child(3)]:col-start-2 [&:nth-child(3)]:row-start-1 before:content-[''] before:w-1 [&:nth-child(1)]:before:bg-pots-one [&:nth-child(2)]:before:bg-pots-three [&:nth-child(3)]:before:bg-pots-two [&:nth-child(4)]:before:bg-pots-four before:rounded-default">
      <div className="grid gap-space-50">
        <span className="text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5 text-color-three">
          {name}
        </span>
        <span className="text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4-bold text-color-one">
          ${total}
        </span>
      </div>
    </li>
  );
}
