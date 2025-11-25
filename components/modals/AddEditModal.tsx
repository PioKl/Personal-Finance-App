import { useState } from "react";
import { AddEditModal as AddEditModalType } from "@/types";
import { Modal, Box, TextField, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconCloseModal from "@/assets/icons/icon-close-modal.svg";
import IconDown from "@/assets/icons/icon-caret-down.svg";
import { themeSelectOptions } from "@/utils/themes";
import clsx from "clsx";
import data from "@/data/data.json";
import { isDigit } from "@/utils/validations";
interface RotatingIconProps {
  className?: string;
}
export default function AddEditModal({
  open,
  onClose,
  category,
  message,
  variant,
}: AddEditModalType) {
  const RotatingIcon = ({ className, ...other }: RotatingIconProps) => {
    return (
      <IconDown
        {...other} // obsługuje kliknięcie selecta i dostępność
        className={`!top-[45%] !right-[16px] transition-transform duration-200 ${className}`}
      />
    );
  };

  //Lower, bo zamiast Budget, chcę sprawdzać po budget
  const categoryLower =
    typeof category === "string" ? category.toLocaleLowerCase() : "";

  //Wszystkie możliwe kategorie wyjęte z transactions
  const sortSelectOptions = [
    ...new Set(data.transactions.map((item) => item.category)), //Usunięcie duplikatów za pomocą Set i użycie data.transactions ponieważ tam są zawarte wszystkie kategorie
  ];

  //Użyte kategorie w budżecie
  const usedCategories: string[] =
    categoryLower === "budget" ? data.budgets.map((item) => item.category) : [];

  //Unikalne kategorie, czyli bez tych już użytych w budżecie
  const uniqueSelectCategories = sortSelectOptions.filter(
    (item) => !usedCategories.includes(item)
  );

  //Wybrana wartość kategorii, domyślnie jest ustawiona pierwsza wolna kategoria
  const [sortSelectCategoryOptionValue, setSortSelectCategoryOptionValue] =
    useState(uniqueSelectCategories[0]);

  //Funkcje ustawiająca nową wybraną kategorię (stan)
  const handleSortByCategory = (value: string) => {
    setSortSelectCategoryOptionValue(value);
  };

  //themes nie zawsze będzie budgets dotyczyć, dla potsów będzie pots
  const usedThemes =
    categoryLower === "budget"
      ? data.budgets.map((item) => item.theme)
      : data.pots.map((item) => item.theme);

  //Domyślny, żeby nie był już użytym theme
  const defaultThemeOption =
    themeSelectOptions.find((item) => !usedThemes.includes(item.theme)) ||
    themeSelectOptions[0]; //te lub jest po to, że jak już wszystkie są użyte

  const [themeSelectValue, setThemeSelecValue] = useState(
    defaultThemeOption.value
  );

  const handleSortByTheme = (value: string) => {
    setThemeSelecValue(value);
  };

  //Walidacja, errory
  const [spendingAmount, setSpendingAmount] = useState("");
  const [potName, setPotName] = useState("");
  const validation = {
    amount: spendingAmount.trim() === "", //jeśli puste pole to błąd
    pot: potName.trim() === "", //jeśli puste pole to błąd
  };

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
            {variant === "add" ? `Add New ${category}` : `Edit ${category}`}
          </h1>
          <button onClick={onClose}>
            <IconCloseModal />
          </button>
        </div>

        <p
          id="modal-description"
          className="text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 text-color-three"
        >
          {message}
        </p>
        <ul className="grid gap-space-200 text-center">
          {categoryLower === "budget" && (
            <li>
              <div className="flex flex-col items-start gap-space-100">
                <span className="flex text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5-bold text-color-three whitespace-nowrap">
                  Budget category
                </span>
                <TextField
                  select
                  //defaultValue={sortSelectOptions[0]}
                  value={sortSelectCategoryOptionValue}
                  onChange={(e) => {
                    handleSortByCategory(e.target.value);
                  }}
                  className={clsx("mui-select", "w-full", "text-left")}
                  slotProps={{
                    select: {
                      IconComponent: RotatingIcon,
                      renderValue: () => sortSelectCategoryOptionValue,
                    },
                  }}
                >
                  {uniqueSelectCategories.map((option) => (
                    <MenuItem
                      key={option}
                      value={option}
                      autoFocus={false}
                      disableRipple //wyłączenie pojawiania się wypełnienia tła kolorem przy kliknięciu na przycisk
                      className="!text-preset-4 !tracking-preset-4 !leading-preset-4 !font-preset-4 !text-color-one [&.Mui-selected]:!font-preset-4d !border-b-1 !border-default !px-0 !py-space-150 [&.Mui-selected]:!bg-transparent [&.Mui-selected:hover]:!bg-transparent hover:!bg-transparent hover:!font-preset-4-bold focus-within:!bg-transparent focus-within:!font-preset-4-bold"
                    >
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </li>
          )}
          {categoryLower === "pot" && (
            <li>
              <div className="flex flex-col items-start gap-space-100">
                <span className="flex text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5-bold text-color-three whitespace-nowrap">
                  Pot Name
                </span>
                <FormControl
                  className={clsx("mui-select w-full text-left")}
                  error={validation.pot}
                >
                  <OutlinedInput
                    value={potName}
                    onChange={(e) => {
                      setPotName(e.target.value);
                    }}
                    placeholder="e.g. Rainy Days"
                    label="" // ← konieczne, żeby placeholder był widoczny
                    inputProps={{ maxLength: 30 }}
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
                  />
                  <span className="text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5 text-color-three mt-1 ml-auto">
                    {30 - potName.length} characters left
                  </span>
                </FormControl>
              </div>
            </li>
          )}
          <li>
            <div className="flex flex-col items-start gap-space-100">
              <span className="flex text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5-bold text-color-three whitespace-nowrap">
                {categoryLower === "budget" ? "Maximum Spending" : "Target"}
              </span>
              <FormControl
                className={clsx("mui-select w-full text-left")}
                error={validation.amount}
              >
                <OutlinedInput
                  value={spendingAmount}
                  onChange={(e) => {
                    if (isDigit(e.target.value)) {
                      setSpendingAmount(e.target.value);
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
          </li>
          <li>
            <div className="flex flex-col items-start gap-space-100">
              <span className="flex text-preset-5 tracking-preset-5 leading-preset-5 font-preset-5-bold text-color-three whitespace-nowrap">
                Color Tag
              </span>
              <TextField
                select
                value={themeSelectValue}
                onChange={(e) => {
                  handleSortByTheme(e.target.value);
                }}
                className={clsx("mui-select", "w-full", "text-left")}
                slotProps={{
                  select: {
                    IconComponent: RotatingIcon,
                    renderValue: (selected) => {
                      const selectedValue = selected as string; // rzutowanie na string
                      const selectedOption = themeSelectOptions.find(
                        (opt) => opt.value === selectedValue
                      );

                      return (
                        <div className="flex items-center gap-space-150">
                          {selectedOption && (
                            <span
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: selectedOption.theme }}
                            />
                          )}
                          <span>{selectedValue}</span>
                        </div>
                      );
                    },
                  },
                }}
              >
                {themeSelectOptions.map((option) => {
                  const isColorUsed = usedThemes.includes(option.theme); //w celu sprawdzenia, czy kolor jest już użyty
                  return (
                    <MenuItem
                      key={option.id}
                      value={option.value}
                      autoFocus={false}
                      disabled={isColorUsed} //brak możliwości kliknięcia jeśli kolor już użyty
                      disableRipple //wyłączenie pojawiania się wypełnienia tła kolorem przy kliknięciu na przycisk
                      className="!text-preset-4 !tracking-preset-4 !leading-preset-4 !font-preset-4 !text-color-one [&.Mui-selected]:!font-preset-4d !border-b-1 !border-default !px-0 !py-space-150 [&.Mui-selected]:!bg-transparent [&.Mui-selected:hover]:!bg-transparent hover:!bg-transparent hover:!font-preset-4-bold focus-within:!bg-transparent focus-within:!font-preset-4-bold"
                    >
                      <div className="flex flex-1 items-center gap-space-150">
                        <span
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: option.theme }}
                        />
                        <span
                          className={`${
                            isColorUsed ? "text-color-three" : "text-color-one"
                          }`}
                        >
                          {option.value}
                        </span>
                        {isColorUsed && (
                          <span className="ml-auto text-color-three">
                            Already Used
                          </span>
                        )}
                      </div>
                    </MenuItem>
                  );
                })}
              </TextField>
            </div>
          </li>
          <li className="mt-1">
            <button
              className="w-full p-space-200 text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4-bold bg-fill-one text-color-two rounded-alt"
              /* onClick={variant === "add" ? handleAddBudget : handleSaveChanges} */
            >
              {variant === "add"
                ? categoryLower === "budget"
                  ? "Add Budget"
                  : "Add Pot"
                : "Save Changes"}
            </button>
          </li>
        </ul>
      </Box>
    </Modal>
  );
}
