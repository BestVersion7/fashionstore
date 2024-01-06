export const formatCurrency = (total: number) => {
  return `$${(total / 100).toFixed(2)}`;
};
