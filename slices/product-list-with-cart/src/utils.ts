export const formatCurrency = (number: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
  }).format(number);
};
