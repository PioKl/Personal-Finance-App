import data from "@/data/data.json";
import { Balance, Pots } from "@/types";
import { priceDollarsFormatting } from "@/utils/formattingFunctions";
import Button from "@/components/ui/Button";
import IconCaretRight from "@/assets/icons/icon-caret-right.svg";
import IconPot from "@/assets/icons/icon-pot.svg";

export const metadata = {
  title: "Overview",
};

export default function Home() {
  //const { balance, pots } = data as { balance: Balance; pots: Pots[] };
  const { balance } = data as { balance: Balance };
  const { pots } = data as { pots: Pots[] };
  const potsSlice = pots.slice(0, 4);
  console.log(potsSlice);

  return (
    <>
      <div className="mb-space-400">
        <h1>Overview</h1>
      </div>
      <div className="flex flex-col gap-space-150 mb-space-400 md:flex-row md:gap-space-300">
        {Object.entries(balance).map(([key, value], index) => (
          <div
            key={key}
            className={`grid gap-space-150 flex-1 p-space-300 rounded-default first:bg-fill-one bg-fill-two first:text-color-two text-color-three`}
          >
            <span className="capitalize font-preset-4 text-preset-4 leading-preset-4 tracking-preset-4">
              {key === "current" ? `${key} Balance` : key}
            </span>
            <span
              className={`font-preset-1 text-preset-1 leading-preset-1 tracking-preset-1 ${
                index === 0 ? "text-color-two" : "text-color-one"
              }`}
            >
              ${priceDollarsFormatting(value)}
            </span>
          </div>
        ))}
      </div>
      <div>
        <div className="grid gap-space-250 py-space-300 px-space-250 md:p-space-400 bg-fill-two rounded-default">
          <div className="flex items-end justify-between">
            <h2>Pots</h2>
            <Button
              variant="link"
              isALink={true}
              link="#"
              className="flex items-center gap-space-150"
            >
              See Details
              <IconCaretRight />
            </Button>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex items-center gap-4 py-5 px-4 bg-fill-three rounded-default">
              <IconPot />
              <div className="grid gap-3">
                <span className="text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 text-color-three">
                  Total Saved
                </span>
                <span className="text-preset-1 tracking-preset-1 leading-preset-1 font-preset-1 text-color-one">
                  $850
                </span>
              </div>
            </div>
            <ul>
              {potsSlice.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
