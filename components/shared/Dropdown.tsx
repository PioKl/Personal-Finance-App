"use client";
import { useRef } from "react";
import IconEllipsis from "@/assets/icons/icon-ellipsis.svg";
import type { Dropdown } from "@/types";

export default function Dropdown({ children }: Dropdown) {
  const dropDownMenuRef = useRef<HTMLUListElement>(null);
  const handleDropDownButton = () => {
    if (dropDownMenuRef.current) {
      dropDownMenuRef.current.classList.toggle("hidden");
      dropDownMenuRef.current.classList.toggle("grid");
    }
  };
  return (
    <div className="relative">
      <button onClick={handleDropDownButton}>
        <IconEllipsis />
      </button>
      <ul
        ref={dropDownMenuRef}
        className="hidden absolute left-full -translate-x-full z-1 w-max px-space-250 py-space-150 text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 bg-fill-two shadow-[0_4px_24px_0_rgba(0,0,0,0.25)] divide-y [&>li:first-child]:pb-space-150 [&>li:not(:first-child)]:not(:last-child)]:py-space-150 [&>li:last-child]:pt-space-150 divide-default rounded-alt"
      >
        <li>
          <button className="text-color-one">Edit {children}</button>
        </li>
        <li>
          <button className="text-color-red">Delete {children}</button>
        </li>
      </ul>
    </div>
  );
}
