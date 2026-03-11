// Product inside review
export type ReviewProduct = {
  _id: string;
  id: string;
  title: string;
  imgCover: string;
};

// User inside review
export type ReviewUser = {
  _id: string;
  firstName: string;
  lastName: string;
  photo: string;
};

// Review item
export type Review = {
  product: ReviewProduct;
  user: ReviewUser;
  rating: number;
  title: string;
  comment: string;
  status: "approved" | "pending" | "rejected";
} & DataBaseProbs;

// API Response
export type Reviews = {
  reviews: Review[];
};
