import { SearchParams } from "../types/common";

export function convertSearchParams(params: SearchParams) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") {
      searchParams.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => {
        searchParams.append(key, v);
      });
    }
  });

  return searchParams;
}
