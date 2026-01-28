import { IconFilter as IconFilterProps } from "@/types";
import IconFilterMobile from "@/assets/icons/icon-filter-mobile.svg";

export const IconFilter = ({ className, ...other }: IconFilterProps) => {
  return (
    <IconFilterMobile
      {...other}
      className={`!right-[11px] ${className}`}
      style={{ transform: "none" }} // nadpisuje inline transform od MUI
    />
  );
};
