import { IconSort as IconSortProps } from "@/types";
import IconSortMobile from "@/assets/icons/icon-sort-mobile.svg";

export const IconSort = ({ className, ...other }: IconSortProps) => {
  return (
    <IconSortMobile
      {...other}
      className={`!right-[11px] ${className}`}
      style={{ transform: "none" }} // nadpisuje inline transform od MUI
    />
  );
};
