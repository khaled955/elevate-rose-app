export const CART = {
  GET: "/cart",
  ADD: "/cart",
  CLEAR_CART: "/cart",
  UPDATE: (productId: string) => `/cart/${productId}`,
  DELETE_PRODUCT: (productId: string) => `/cart/${productId}`,
};
