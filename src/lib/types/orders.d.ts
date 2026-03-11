import { Product } from "./product";

export type ShippingAddress = {
  street: string;
  city: string;
  phone: string;
  lat: string;
  long: string;
};

export type OrderItem = DataBaseProbs & {
  product: Product;
  price: number;
  quantity: number;
};

export type PaymentType = "cash" | "credit";

export type OrderState = "pending" | "confirmed" | "cancelled" | "delivered";

export type Order = DataBaseProbs & {
  user: string;

  shippingAddress?: ShippingAddress;

  orderItems: OrderItem[];

  totalPrice: number;
  paymentType: PaymentType;

  isPaid: boolean;
  paidAt?: string;

  isDelivered: boolean;
  state: OrderState;

  orderNumber: string;
};

export type OrdersPayload = PaginatedResponse<{
  orders: Order[];
}>;

export type OrdersApiResponse = APIResponse<OrdersPayload>;
