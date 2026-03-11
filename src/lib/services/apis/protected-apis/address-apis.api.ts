export const ADDRESS = {
  ADD: "/addresses",
  GET: "/addresses",
  UPDATE: (addressId: string) => `/addresses/${addressId}`,
  DELETE: (addressId: string) => `/addresses/${addressId}`,
};
