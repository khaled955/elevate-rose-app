import { Product } from '@/lib/types/product';
export type AddToCartProps = {
  productId: string;
  quantity: number;
};

export type CartItemResponse = {
  _id: string;
  product: Product;
  price: number;
  quantity: number;
};

export type Cart = {
  user: string;

  cartItems: CartItemResponse[];
  appliedCoupons: string[];

  totalPrice: number;
} & DataBaseProbs;

export type CartResponse = {
  message: "success";
  cart: Cart;
  numOfCartItems: number;
};



export type GuestCartItem = {
  _id: string; // unique row id
  quantity: number; // quantity in cart
  price: number; // unit price
  product: GuestCartProductSnapshot;
};



export type CartProductSnapshot = {
  _id: string;
  title: string;
  imgCover?: string;
  rateAvg?: number;
  rateCount?: number;
  quantity: number; // stock
};

export type CartItemUI = {
  _id: string;
  product: CartProductSnapshot;
  price: number;
  quantity: number;
};
