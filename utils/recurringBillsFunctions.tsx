import { Transactions } from "@/types";

export const paidBillsByMonth = (
  transactions: Transactions[],
  calculateSum: boolean,
) => {
  const filtered = transactions.filter(
    (item) => item.recurring === true && item.date.charAt(6) === "8",
  );
  /*Dany miesiąc, tu chodzi o sierpień
    charAt(6)
    date = "2025-08-23";
    0 1 2 3 4 5 6 7 8 9
    2 0 2 5 - 0 8 - 2 3
                ↑
                6
    */
  if (calculateSum === true) {
    return filtered.map((item) => item.amount).reduce((a, b) => a + b, 0);
  } else {
    return filtered;
  }
};

export const totalUpcoming = (
  transactions: Transactions[],
  calculateSum: boolean,
) => {
  const latestTransaction = transactions[0].date.substring(8, 10); //wyciągnięcie samego dnia
  /* 
      date.substring(8, 10)
      0 1 2 3 4 5 6 7 8 9
      2 0 2 5 - 0 8 - 1 9
                      ↑ ↑
                      8 9
      */
  const filtered = transactions.filter(
    (item) =>
      item.recurring === true &&
      Number(item.date.substring(8, 10)) > Number(latestTransaction),
  );
  if (calculateSum === true) {
    return filtered.map((item) => item.amount).reduce((a, b) => a + b, 0);
  } else {
    return filtered;
  }
};

export const dueSoon = (
  transactions: Transactions[],
  calculateSum: boolean,
) => {
  const latestTransaction = transactions[0].date.substring(8, 10); //wyciągnięcie samego dnia
  /* 
      date.substring(8, 10)
      0 1 2 3 4 5 6 7 8 9
      2 0 2 5 - 0 8 - 1 9
                      ↑ ↑
                      8 9
      */
  const filtered = transactions.filter(
    (item) =>
      item.recurring === true &&
      Number(item.date.substring(8, 10)) > Number(latestTransaction) &&
      Number(item.date.substring(8, 10)) <= Number(latestTransaction) + 5,
  );
  if (calculateSum === true) {
    return filtered.map((item) => item.amount).reduce((a, b) => a + b, 0);
  } else {
    return filtered;
  }
};
