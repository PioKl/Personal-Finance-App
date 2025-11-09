"use client";
import { useRef, useEffect } from "react";
import IconEllipsis from "@/assets/icons/icon-ellipsis.svg";
import type { Dropdown } from "@/types";

export default function Dropdown({ children }: Dropdown) {
  const dropDownMenuRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleDropDownButton = () => {
    if (dropDownMenuRef.current) {
      dropDownMenuRef.current.classList.toggle("hidden");
      dropDownMenuRef.current.classList.toggle("grid");
    }
  };

  useEffect(() => {
    //Zamknięcie dropdowna przy kliknięciu poza jego obszar i naciśnięciu esc
    //event dotyczy kliknięcia myszką, bądź naciśnięciu klawisza
    const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
      //jeśli target to MouseEvent to wtedy target = event.target, a jak nie czyli dotyczy klawiatury to null - bo nie klikam myszką wtedy
      const target = event instanceof MouseEvent ? event.target : null;

      if (
        //sprawdzenie dla myszki, czyli jeśli target jest true (czyli w tym przypadku nie jest nullem, czyli event dotyczy kliknięcia) i jeśli jest div (w którym jest button otwierający dropdown i dropdown) oraz sprawdzenie czy kliknięty jakiś klinięty element nie należy do dropdowna ani przycisku, więc jeśli został klinięty poza obszarem diva z dropdownem wtedy jest true i zamykany będzie dropdown
        (target &&
          containerRef.current &&
          !containerRef.current.contains(target as Node)) ||
        //sprawdzenie dla klawiatury, jeśli event jest KeyboardEvent i wciśnięto Escape, warunek jest true.
        (event instanceof KeyboardEvent && event.key === "Escape")
      ) {
        dropDownMenuRef.current?.classList.add("hidden");
        dropDownMenuRef.current?.classList.remove("grid");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button onClick={handleDropDownButton}>
        <IconEllipsis />
      </button>
      <ul
        ref={dropDownMenuRef}
        className="hidden absolute left-full -translate-x-full z-1 w-max px-space-250 py-space-150 text-preset-4 tracking-preset-4 leading-preset-4 font-preset-4 bg-fill-two custom-shadow divide-y [&>li:first-child]:pb-space-150 [&>li:not(:first-child)]:not(:last-child)]:py-space-150 [&>li:last-child]:pt-space-150 divide-default rounded-alt"
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
