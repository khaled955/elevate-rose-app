export type Product = {
  title: string;
  slug: string;
  description: string;

  imgCover: string;
  images: string[];

  price: number;
  priceAfterDiscount: number | null;

  quantity: number;
  sold: number;

  category: string; // categoryId
  occasion: string; // occasionId

  rateAvg: number;
  rateCount: number;

  favoriteId: string | null;
  isInWishlist: boolean;

  isSuperAdmin: boolean;


}& DataBaseProbs;




export type Products = {
  products: Product[];
};





export type CurrentProductResponse = {
  product: {
    _id: string;
    title: string;
    description: string;
    price: number;
    discount?: number;
    priceAfterDiscount: number;
    quantity: number;
    imgCover: string;
    images: string[];
    category: string;
    occasion: string;
  };
};