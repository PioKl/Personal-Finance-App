import * as React from "react";
import usePagination from "@mui/material/usePagination";
import IconCaretLeft from "@/assets/icons/icon-caret-left.svg";
import IconCaretRight from "@/assets/icons/icon-caret-right.svg";

interface PaginationProps {
  count: number; // liczba stron
  page: number; // aktualna strona
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export default function CustomPagination({
  count,
  page,
  onChange,
}: PaginationProps) {
  const { items } = usePagination({
    count,
    page,
    onChange,
  });

  return (
    <nav>
      <ul className="flex items-center justify-center gap-space-100">
        {items.map(({ page, type, selected, disabled, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <button
                type="button"
                className={`px-space-200 py-space-100 border rounded-alt hover:bg-fill-pagination hover:border-pagination hover:text-color-two focus-visible:bg-fill-pagination focus-visible:outline-none focus-visible:border-pagination focus-visible:text-color-two text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 ${
                  selected
                    ? "bg-fill-one text-color-two border-pagination-active"
                    : "bg-fill-two text-color-one border-pagination"
                }`}
                {...item}
              >
                {page}
              </button>
            );
          } else if (type === "previous") {
            children = (
              <button
                type="button"
                className="group flex items-center gap-space-200 px-space-200 py-space-150 border border-pagination rounded-alt hover:bg-fill-pagination hover:border-pagination hover:text-color-two focus-visible:bg-fill-pagination focus-visible:outline-none focus-visible:border-pagination focus-visible:text-color-two text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 disabled:cursor-not-allowed md:py-space-100"
                {...item}
                disabled={disabled}
              >
                <IconCaretLeft className="[&>path]:fill-color-pagination group-hover:[&>path]:fill-color-two group-focus-visible:[&>path]:fill-color-two" />
                <span className="hidden md:block">Prev</span>
              </button>
            );
          } else if (type === "next") {
            children = (
              <button
                type="button"
                className="group flex items-center gap-space-200 px-space-200 py-space-150 border border-pagination rounded-alt hover:bg-fill-pagination hover:border-pagination hover:text-color-two focus-visible:bg-fill-pagination focus-visible:outline-none focus-visible:border-pagination focus-visible:text-color-two text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 disabled:cursor-not-allowed md:py-space-100"
                {...item}
                disabled={disabled}
              >
                <span className="hidden md:block">Next</span>
                <IconCaretRight className="[&>path]:fill-color-pagination group-hover:[&>path]:fill-color-two group-focus-visible:[&>path]:fill-color-two" />
              </button>
            );
          }

          return (
            <li key={index} className="first:mr-auto last:ml-auto">
              {children}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
