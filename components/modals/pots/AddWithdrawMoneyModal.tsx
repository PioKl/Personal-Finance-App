import { useState } from "react";
import { AddWithdrawMoneyModal as AddWithdrawMoneyModalType } from "@/types";
import { Modal, Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconCloseModal from "@/assets/icons/icon-close-modal.svg";
import {
  priceDollarsFormatting,
  formatPercent,
} from "@/utils/formattingFunctions";
import clsx from "clsx";
import { isDigit } from "@/utils/validations";
import Button from "@/components/ui/Button";

export default function AddWithdrawMoneyModal({
  variant,
  message,
  amount,
  target,
  name,
  open,
  onClose,
}: AddWithdrawMoneyModalType) {
  const amountSaved = (amount / target) * 100;
  //Walidacja, errory
  const [newAmount, setNewAmount] = useState("");
  const validation = {
    amount: newAmount.trim() === "", //jeśli puste pole to błąd
  };
  const parsedNewAmount = Number(newAmount);
  const parsedNewAmountPercent = (Number(newAmount) / target) * 100;

  const addFormatPercent = Number(
    formatPercent(amountSaved + parsedNewAmountPercent)
  );
  const withdrawFormatPercent = Number(
    formatPercent(amountSaved - parsedNewAmountPercent)
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid gap-space-250 min-w-[335px] px-space-250 py-space-300 custom-shadow-modal bg-fill-two rounded-default md:max-w-[560px] md:p-space-400">
        <div className="flex items-center justify-between">
          <h1
            id="modal-title"
            /* nadpisanie domyślnych stylów dla h1, które są zdefiniowane w typography */
            className="!text-preset-2 !tracking-preset-2 !leading-preset-2 md:!text-preset-1 md:!tracking-preset-1 md:!leading-preset-1"
          >
            {variant === "add" ? `Add New Pot` : `Withdraw from '${name}'`}
          </h1>
          <button onClick={onClose}>
            <IconCloseModal />
          </button>
        </div>
        <p>{message}</p>
        <div className="grid gap-space-200">
          <div className="flex items-center justify-between">
            <span className="text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 text-color-three">
              New Amount
            </span>
            <span className="text-preset-1 tracking-preset-1 leading-preset-1 font-preset-1 text-color-one">
              $
              {variant === "add"
                ? priceDollarsFormatting(amount + parsedNewAmount)
                : priceDollarsFormatting(amount - parsedNewAmount)}
            </span>
          </div>
          <div className="relative w-full h-2 bg-fill-three rounded-small">
            {(variant === "add" ||
              //Ten poniższy dzieje się w przypadku withdraw
              (variant === "withdraw" && withdrawFormatPercent > 0)) && (
              <div
                className="absolute w-[calc(var(--spent-percent)-8px)] h-2 bg-fill-one rounded-small"
                style={
                  {
                    width: `clamp(4px, ${Math.min(amountSaved, 100)}%, 100%)`,
                  } as React.CSSProperties
                }
              ></div>
            )}
            {variant === "withdraw" && (
              <div
                className="absolute w-[calc(var(--spent-percent)-8px)] h-2 bg-red-700 rounded-small"
                style={
                  {
                    width: `clamp(0px, ${Math.min(
                      parsedNewAmountPercent,
                      100
                    )}%, 100%)`,
                  } as React.CSSProperties
                }
              ></div>
            )}

            {/* Math.min, druga wartość tam gdzie 100 oznacza ograniczenie do 100 tylko max tyle może osiągnać */}
            {variant === "add" && (
              <div
                className="absolute w-[calc(var(--spent-percent)-8px)] h-2 bg-amount rounded-small"
                style={
                  {
                    width: `clamp(0px, ${Math.min(
                      parsedNewAmountPercent,
                      100
                    )}%, 100%)`,
                    left: `clamp(4px, ${Math.min(amountSaved, 100)}%, 100%)`,
                  } as React.CSSProperties
                }
              ></div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span
              className={`text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5-bold ${
                variant === "add"
                  ? parsedNewAmount > 0
                    ? "text-amount"
                    : "text-color-three"
                  : withdrawFormatPercent > 0
                  ? "text-color-three"
                  : "text-color-red"
              }`}
            >
              {variant === "add" ? addFormatPercent : withdrawFormatPercent}%
            </span>
            <span className="text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5 text-color-three">
              Target of ${target}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-space-100">
          <span className="flex text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5-bold text-color-three whitespace-nowrap">
            Amount to Add
          </span>
          <FormControl
            className={clsx("mui-select w-full text-left")}
            error={validation.amount}
          >
            <OutlinedInput
              value={newAmount}
              onChange={(e) => {
                if (
                  variant === "withdraw" &&
                  e.target.value.length <= 4 &&
                  isDigit(e.target.value)
                ) {
                  setNewAmount(e.target.value);
                } else if (
                  isDigit(e.target.value) &&
                  Number(e.target.value) <=
                    Number(target) -
                      Number(
                        amount
                      ) /* maksymalna kwota nie może przekroczyć róznicy maksymalnego targetu i amount */
                ) {
                  setNewAmount(e.target.value);
                }
              }}
              placeholder="e.g. 2000"
              label="" // ← konieczne, żeby placeholder był widoczny
              classes={{
                input:
                  "!py-space-150 !text-preset-4 !tracking-preset-4 !leading-preset-4 !font-preset-4", // ← padding inputa
              }}
              sx={{
                "& input::placeholder": {
                  color: "#98908b", // kolor placeholdera
                  opacity: 1,
                },
              }}
              startAdornment={
                <InputAdornment position="start">
                  <span className="text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 text-input-placeholder">
                    $
                  </span>
                </InputAdornment>
              }
              notched={false}
            />
          </FormControl>
        </div>
        {variant === "add" ? (
          <Button variant="primary" isALink={false}>
            Confirm Addition
          </Button>
        ) : (
          <Button variant="primary" isALink={false}>
            Confirm Withdrawal
          </Button>
        )}
      </Box>
    </Modal>
  );
}
