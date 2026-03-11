import type { CartItemResponse, GuestCartItem } from "@/lib/types/cart";
import type { Product } from "@/lib/types/product";

export function mapGuestToCartItemResponse(item: GuestCartItem): CartItemResponse {
  const p = item.product;

  const product: Product = {
    // Product fields
    title: p.title,
    slug: "",
    description: "",

    imgCover: p.imgCover ?? "",
    images: [],

    price: item.price,
    priceAfterDiscount: null,

    quantity: p.quantity, // stock
    sold: 0,

    category: "",
    occasion: "",

    rateAvg: p.rateAvg ?? 0,
    rateCount: p.rateCount ?? 0,

    favoriteId: null,
    isInWishlist: false,

    isSuperAdmin: false,

    // DataBaseProbs fields
    _id: p._id,
    createdAt: "",
    updatedAt: "",
  };

  return {
    _id: item._id,
    product,
    price: item.price,
    quantity: item.quantity,
  };
}
