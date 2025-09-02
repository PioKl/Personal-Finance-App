import { LinkButton, StandardButton } from "@/interfaces";

export type ButtonProps<T> =
  | (StandardButton<T> & React.ButtonHTMLAttributes<HTMLButtonElement>) //Zwykły button
  | (LinkButton<T> &
      Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">); //Link, bez href bo nie chcę href przekazywać gdy jest anchor tylko przy pomocy link, chcę żebym mógł przekazać href we właściowości link jeśli isALink jest true

export type Balance = {
  current: number;
  income: number;
  expenses: number;
};
