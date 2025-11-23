//Czy jest cyfrą 0-9 + część dziesiętna z kropką
export const isDigit = (value: string): boolean => {
  return /^\d*\.?\d{0,2}$/.test(value);
};
