import { RotatingIcon as RotatingIconProps } from "@/types";
import IconDown from "@/assets/icons/icon-caret-down.svg";

export const RotatingIcon = ({ className, ...other }: RotatingIconProps) => {
  return (
    <IconDown
      {...other} // obsługuje kliknięcie selecta i dostępność
      className={`!top-[45%] !right-[16px] transition-transform duration-200 ${className}`}
    />
  );
};
