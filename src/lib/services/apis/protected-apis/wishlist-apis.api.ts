export const WISHLIST = {
  GET_ALL: "/wishlist",
  CLEAR_ALL: "/wishlist/clear",
  ADD_ONE: "/wishlist",
  CHECK_AVAIABLE: (productId: string) => `/wishlist/check/${productId}`,
  REMOVE_ONE: (productId: string) => `/wishlist/${productId}`,
};
