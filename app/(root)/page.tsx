import data from "@/data/data.json";
import { Balance } from "@/types";
import { priceDollarsFormatting } from "@/utils/formattingFunctions";

export const metadata = {
  title: "Overview",
};

export default function Home() {
  const { balance } = data as { balance: Balance };

  return (
    <>
      <div className="mb-space-400">
        <h1>Overview</h1>
      </div>
      <div className="flex flex-col gap-space-150 md:flex-row md:gap-space-300">
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
    </>
  );
}
