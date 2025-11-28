import { Pots } from "@/types";
import PotItem from "./PotItem";

type PotsListProps = {
  pots: Pots[];
};

export default function PotsList({ pots }: PotsListProps) {
  return (
    <ul className="grid gap-space-300 xl:grid-cols-2">
      {pots.map((item, index) => (
        <PotItem key={index} {...item} />
      ))}
    </ul>
  );
}
