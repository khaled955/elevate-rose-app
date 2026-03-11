// Single Similar Product
export type SimilarProduct = {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount: number;
  rateAvg?: number; // optional (missing in one item)
  rateCount?: number; // optional (missing in one item)
  similarityScore?: number;
};

// API Response
export type SimilarProductsResponse = {
  message: "success";
  count: number;
  similarProducts: SimilarProduct[];
};
