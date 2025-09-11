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

export type Pots = {
  name: string;
  target: number;
  total: number;
  theme: string;
};

export type Transactions = {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
};

export type Budgets = {
  category: string;
  maximum: number;
  theme: string;
};
