import { Product } from "./product";

export type YouMayLikeProduct = Pick<
  Product,
  | "title"
  | "imgCover"
  | "price"
  | "priceAfterDiscount"
  | "rateAvg"
  | "rateCount"
> & {
  _id: string;
  id: string;
};

export type YouMayLikeProductsResponse = {
  message:string;
  count: number;
  recommendations: YouMayLikeProduct[];
};
