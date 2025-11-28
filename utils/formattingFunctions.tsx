//Dollar Format

export const priceDollarsFormatting = (
  price: number,
  removeMinus: boolean = false
): string => {
  const value = removeMinus ? Math.abs(price) : price;
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

//Date Format

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatAmount(amount: number): string {
  return (
    (amount >= 0 ? "+" : "") +
    amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    })
  );
}

//Procenty
export function formatPercent(value: number) {
  const fixed = value.toFixed(2); //zaokrąglenie do dwóch miejsc po przecinku np. "66.66"
  const [int, dec] = fixed.split("."); // ["66", "66"] np jak jest 7.95 to in jest 7 a dec 95, 66.66 to właśnie int 66, a dec 66

  // jeśli dwie cyfry po przecinku są takie same → skróć, czyli z 66.66 zrobi 66.6
  if (dec[0] === dec[1]) {
    return `${int}.${dec[0]}`;
  }

  return `${int}.${dec}`; //w innym przypadku normalnie połączy czyli 7 i 95 to będzie 7.95
}
