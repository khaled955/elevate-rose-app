export const CATEGORIES = {
  GET_ALL_CATEGORIES: "/categories",
  CREATE: "/categories",
  GET_LIMITED: (pageNumber: number, limit: number) =>
    `/categories?page=${pageNumber}&limit=${limit}`,
  GET_CURRENT: (categoryId: string) => `/categories/${categoryId}`,
  UPDATE: (categoryId: string) => `/categories/${categoryId}`,
  DELETE: (categoryId: string) => `/categories/${categoryId}`,
};
