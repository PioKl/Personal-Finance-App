import React from "react";
import CategoryBudget from "./CategoryBudget";
import { CategoryBudgetsInterface } from "@/interfaces";

export default function CategoryBudgets({
  categoryBudgets,
}: CategoryBudgetsInterface) {
  return (
    <>
      {categoryBudgets.map((item, index) => (
        <CategoryBudget
          key={index}
          category={item.category}
          maximum={item.maximum}
          theme={item.theme}
          transactions={item.transactions}
        />
      ))}
    </>
  );
}
