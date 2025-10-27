import { Budgets, Transactions } from "@/types";

export interface Button<T> {
  children: React.ReactNode;
  isALink?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ElementType;
  state?: T;
}

export interface LinkButton<T> extends Button<T> {
  isALink: true;
  link: string;
  variant: "link";
}

export interface StandardButton<T> extends Button<T> {
  isALink?: false;
  link?: never;
  variant: "primary" | "secondary" | "tertiary" | "destroy" | "sidebar";
}

//Omit<Budgets, "_type">, żeby odziedziczyć wszystkie pola oprócz _type
export interface BudgetsWithTransactions extends Omit<Budgets, "_type"> {
  _type: "BudgetsWithTransactions"; //używane do rozróżnienia typów w unionach
  transactions: Transactions[];
}
