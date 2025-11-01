import React from "react";
import CategoryBudget from "./CategoryBudget";
import { CategoryBudgetsInterface } from "@/interfaces";

export default function CategoryBudgets({
  categoryBudgets,
}: CategoryBudgetsInterface) {
  return (
    <div className="flex flex-col flex-1 gap-space-300">
      {categoryBudgets.map((item, index) => (
        <CategoryBudget
          key={index}
          category={item.category}
          maximum={item.maximum}
          theme={item.theme}
          transactions={item.transactions}
        />
      ))}
    </div>
  );
}
