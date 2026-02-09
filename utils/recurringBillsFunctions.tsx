import { Transactions } from "@/types";

export const paidBills = (transactions: Transactions[]) => {
  const items = transactions.filter(
    (item) => item.recurring === true && item.date.charAt(6) === "8", //pofiltorwanie
  );
  /*Dany miesiąc, tu chodzi o sierpień
    charAt(6)
    date = "2025-08-23";
    0 1 2 3 4 5 6 7 8 9
    2 0 2 5 - 0 8 - 2 3
                ↑
                6
    */
  const totalSum = items.reduce((sum, item) => sum + item.amount, 0);

  return {
    items,
    totalSum,
  };
};

export const totalUpcoming = (transactions: Transactions[]) => {
  const latestTransaction = transactions[0].date.substring(8, 10); //wyciągnięcie samego dnia
  /* 
      date.substring(8, 10)
      0 1 2 3 4 5 6 7 8 9
      2 0 2 5 - 0 8 - 1 9
                      ↑ ↑
                      8 9
      */
  const items = transactions.filter(
    (item) =>
      item.recurring === true &&
      Number(item.date.substring(8, 10)) > Number(latestTransaction),
  ); //pofiltorwanie

  const totalSum = items.reduce((sum, item) => sum + item.amount, 0);

  return {
    items,
    totalSum,
  };
};

export const dueSoon = (transactions: Transactions[]) => {
  const latestTransaction = transactions[0].date.substring(8, 10); //wyciągnięcie samego dnia
  /* 
      date.substring(8, 10)
      0 1 2 3 4 5 6 7 8 9
      2 0 2 5 - 0 8 - 1 9
                      ↑ ↑
                      8 9
      */
  const items = transactions.filter(
    (item) =>
      item.recurring === true &&
      Number(item.date.substring(8, 10)) > Number(latestTransaction) &&
      Number(item.date.substring(8, 10)) <= Number(latestTransaction) + 5,
  ); //pofiltorwanie

  const totalSum = items.reduce((sum, item) => sum + item.amount, 0);

  return {
    items,
    totalSum,
  };
};
