export const PRODUCTS = {
  GET_ALL: "/Products",
  CREATE: "/Products",
  GET_LIMITED: "/Products?limit=5",
  BEST_SELLER: (limit: number) => `/Products?sort=-sold&limit=${limit}`,
  MOST_POPULAR: (occasionId: string) => `/Products?occasion=${occasionId}`,
  GET_SPECIFIC_PRODUCT: (productId: string) => `/products/${productId}`,
  DELETE: (productId: string) => `/products/${productId}`,
  UPDATE: (productId: string) => `/products/${productId}`,
};
