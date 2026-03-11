// Single recommendation item
export type Recommendation = {
  _id: string;
  id: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount: number;
  discount: number;
  rateAvg: number;
  rateCount: number;
};

// API response type
export type Recommendations = {
  message: "success";
  count: number;
  recommendations: Recommendation[];
};
