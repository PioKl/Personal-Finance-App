import * as React from "react";
import usePagination from "@mui/material/usePagination";
import type { UsePaginationItem } from "@mui/material/usePagination";
import IconCaretLeft from "@/assets/icons/icon-caret-left.svg";
import IconCaretRight from "@/assets/icons/icon-caret-right.svg";
import { useBreakpoint } from "@/utils/breakpoints";

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

  const { isMdUp } = useBreakpoint();

  const renderedPageButtons: typeof items = [];
  const getPageItem = (p: number) =>
    items.find((item) => item.type === "page" && item.page === p);

  const prev = items.find((i) => i.type === "previous");
  const next = items.find((i) => i.type === "next");
  const firstPage = getPageItem(1);
  const lastPage = getPageItem(count);
  const secondPage = getPageItem(2);
  const currentPage = getPageItem(page);
  const beforeLastPage = getPageItem(count - 1); // przedostatnia strona

  //poprzednia strona
  if (prev) {
    renderedPageButtons.push(prev);
  }
  //pierwsza strona
  if (firstPage) {
    renderedPageButtons.push(firstPage);
  }
  //druga strona (tylko gdy użykownik jest na 1 lub 2 stronie)
  if (secondPage && (page === 1 || page === 2) && count > 2) {
    renderedPageButtons.push(secondPage);
  }
  //Trzy kropeczki, od trzeciej strony wzwyż
  if (page >= 3) {
    renderedPageButtons.push({
      type: "start-ellipsis",
      key: "start-ellipsis",
      disabled: true,
    } as unknown as UsePaginationItem);
  }
  //aktualna strona (poza 1, 2 i ostatnią)
  if (currentPage && page > 2 && page < count) {
    renderedPageButtons.push(currentPage);
  }

  //Trzy kropeczki, strona musi być mniejsza niż przedostatnia
  if (page < count - 1) {
    renderedPageButtons.push({
      type: "start-ellipsis",
      key: "start-ellipsis",
      disabled: true,
    } as unknown as UsePaginationItem);
  }

  //przedostatnia strona (tylko gdy użytkownik jest na ostatniej)
  if (page === count && count > 3 && beforeLastPage) {
    renderedPageButtons.push(beforeLastPage);
  }

  //ostatnia strona, count > 1 jest, żeby nie było duplikatu (firstPage = getPageItem(1))
  if (lastPage && count > 1) {
    renderedPageButtons.push(lastPage);
  }

  //następna strona
  if (next) {
    renderedPageButtons.push(next);
  }

  return (
    <nav>
      <ul className="flex items-center justify-center gap-space-100">
        {(isMdUp ? items : renderedPageButtons).map(
          ({ page, type, selected, disabled, ...item }, index) => {
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
                  className="group flex items-center gap-space-200 px-space-200 py-space-150 border border-pagination rounded-alt enabled:hover:bg-fill-pagination enabled:hover:border-pagination enabled:hover:text-color-two enabled:focus-visible:bg-fill-pagination enabled:focus-visible:outline-none enabled:focus-visible:border-pagination enabled:focus-visible:text-color-two text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 disabled:cursor-not-allowed disabled:opacity-50 md:py-space-100"
                  {...item}
                  disabled={disabled}
                >
                  <IconCaretLeft className="[&>path]:fill-color-pagination group-enabled:group-hover:[&>path]:fill-color-two group-enabled:group-focus-visible:[&>path]:fill-color-two" />
                  <span className="hidden md:block">Prev</span>
                </button>
              );
            } else if (type === "next") {
              children = (
                <button
                  type="button"
                  className="group flex items-center gap-space-200 px-space-200 py-space-150 border border-pagination rounded-alt enabled:hover:bg-fill-pagination enabled:hover:border-pagination enabled:hover:text-color-two enabled:focus-visible:bg-fill-pagination enabled:focus-visible:outline-none enabled:focus-visible:border-pagination enabled:focus-visible:text-color-two text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 disabled:cursor-not-allowed disabled:opacity-50 md:py-space-100"
                  {...item}
                  disabled={disabled}
                >
                  <span className="hidden md:block">Next</span>
                  <IconCaretRight className="[&>path]:fill-color-pagination group-enabled:group-hover:[&>path]:fill-color-two group-enabled:group-focus-visible:[&>path]:fill-color-two" />
                </button>
              );
            }

            return (
              <li key={index} className="first:mr-auto last:ml-auto">
                {children}
              </li>
            );
          }
        )}
      </ul>
    </nav>
  );
}
