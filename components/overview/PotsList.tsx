import { Pots } from "@/types";
import PotsItem from "./PotsItem";

type PotsListProps = {
  pots: Pots[];
};

export default function PotsList({ pots }: PotsListProps) {
  return (
    <ul className="grid grid-cols-2 gap-space-200 md:flex-1">
      {pots.map((item, index) => (
        <PotsItem key={index} {...item} />
      ))}
    </ul>
  );
}
