import { useState } from "react";
import { Pots } from "@/types";
import Dropdown from "../shared/Dropdown";
import { priceDollarsFormatting } from "@/utils/formattingFunctions";
import { formatPercent } from "@/utils/formattingFunctions";
import Button from "../ui/Button";
import AddWithdrawMoneyModal from "../modals/pots/AddWithdrawMoneyModal";

export default function PotItem({ name, target, total, theme }: Pots) {
  const totalSaved = (total / target) * 100;
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  return (
    <li className="grid gap-space-250 py-space-300 px-space-250 md:p-space-400 bg-fill-two rounded-default">
      <div className="flex justify-between">
        <h2
          className={`flex items-center gap-space-200 before:content-[''] before:w-4 before:h-4 before:bg-[var(--theme-color)] before:rounded-default`}
          style={{ "--theme-color": theme } as React.CSSProperties}
        >
          {name}
        </h2>
        <Dropdown
          category={name}
          editMessage="If your saving targets change, feel free to update your pots."
          deleteMessage="Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
        >
          Pot
        </Dropdown>
      </div>
      <div className="grid gap-space-200">
        <div className="flex items-center justify-between">
          <span className="text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 text-color-three">
            Total Saved
          </span>
          <span className="text-preset-1 tracking-preset-1 leading-preset-1 font-preset-1 text-color-one">
            ${priceDollarsFormatting(total)}
          </span>
        </div>
        <div className="relative w-full h-4 p-1 bg-fill-three rounded-small">
          <div
            className="absolute w-[calc(var(--spent-percent)-8px)] h-2 bg-[var(--theme-color)] rounded-small"
            style={
              {
                "--theme-color": theme,
                width: `clamp(4px, ${Math.min(totalSaved, 100)}%, 100%)`,
              } as React.CSSProperties
            }
          ></div>
          {/* Math.min, druga wartość tam gdzie 100 oznacza ograniczenie do 100 tylko max tyle może osiągnać */}
          <div className="relative mt-5.5">
            <span>{formatPercent(totalSaved)}%</span>
          </div>
        </div>
        <div className="flex gap-space-200 mt-16">
          <Button
            variant="secondary"
            isALink={false}
            className="flex flex-1 items-center justify-center gap-space-150"
            onClick={() => {
              setOpenAddModal(true);
            }}
          >
            + Add Money
          </Button>
          <Button
            variant="secondary"
            isALink={false}
            className="flex flex-1 items-center justify-center gap-space-150"
            onClick={() => {
              setOpenWithdrawModal(true);
            }}
          >
            Withdraw
          </Button>
          <AddWithdrawMoneyModal
            open={openAddModal}
            onClose={() => setOpenAddModal(false)}
            variant="add"
            message="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet."
            amount={total}
            target={target}
            name={name}
          />
          <AddWithdrawMoneyModal
            open={openWithdrawModal}
            onClose={() => setOpenWithdrawModal(false)}
            variant="withdraw"
            message="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet."
            amount={total}
            target={target}
            name={name}
          />
        </div>
      </div>
    </li>
  );
}
