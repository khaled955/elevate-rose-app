export const OCCASIONS = {
  GET_ALL_OCCASIONS: "/occasions",
  CREATE: "/occasions",
  GET_LIMITED_OCCASIONS: (limit: number) => `/occasions?limit=${limit}`,
  GET_SCROLL: (pageNumber: number, limit: number) =>
    `/occasions?page=${pageNumber}&limit=${limit}`,
  DELETE: (occassionId: string) => `/occasions/${occassionId}`,
  UPDATE: (occassionId: string) => `/occasions/${occassionId}`,
  GET_CURRENT: (occassionId: string) => `/occasions/${occassionId}`,
};
