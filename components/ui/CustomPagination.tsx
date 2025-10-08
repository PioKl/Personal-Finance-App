import * as React from "react";
import usePagination from "@mui/material/usePagination";

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
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <button
                type="button"
                className={`px-space-200 py-space-100 border rounded-alt hover:bg-fill-pagination hover:border-pagination hover:text-color-two focus-within:bg-fill-pagination focus-within:outline-none focus-within:border-pagination focus-within:text-color-two text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 ${
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
                className="px-space-200 py-space-100 border border-pagination rounded-alt hover:bg-fill-pagination hover:border-pagination hover:text-color-two focus-within:bg-fill-pagination focus-within:outline-none focus-within:border-pagination focus-within:text-color-two text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4"
                {...item}
              >
                Prev
              </button>
            );
          } else if (type === "next") {
            children = (
              <button
                type="button"
                className="px-space-200 py-space-100 border border-pagination rounded-alt hover:bg-fill-pagination hover:border-pagination hover:text-color-two focus-within:bg-fill-pagination focus-within:outline-none focus-within:border-pagination focus-within:text-color-two text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4"
                {...item}
              >
                Next
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </ul>
    </nav>
  );
}
