export const PAYMENT = {
  CASH: "/orders",
  CREDIT: (url: string) => `/orders/checkout?url=${url}`,
};
