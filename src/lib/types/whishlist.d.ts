export type WhishlistCheck = {
  message: string;
  isInWishlist: boolean;
};

// Wishlist Product
export type WishlistProduct = {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount: number;
  rateAvg: number;
};

export type WishlistResponse = {
  user: string;
  _id: string;
  products: WishlistProduct[];
} & DataBaseProbs;

export type WishlistResponseData = {
  count: number;
  wishlist: WishlistResponse;
};




export type LocalWishlistProduct = {
  id: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount: number;
  rateAvg: number;
};
