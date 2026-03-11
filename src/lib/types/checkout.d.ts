/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "./product";

export type CheckOutAddress = {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
};

// Root Response
export interface CashPaymentResponse {
  message: string;
  order: Order;
}

// Order Object
export interface Order {
  user: string;
  orderItems: OrderItem[];
  totalPrice: number;
  paymentType: "cash" | "credit";
  isPaid: boolean;
  isDelivered: boolean;
  state: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  _id: string;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;
  __v: number;
}

// Order Item
export interface OrderItem {
  product: Product;
  price: number;
  quantity: number;
  _id: string;
}

// Root Response
export interface CreditPaymentResponse {
  message: string;
  session: StripeSession;
}

// Main Session Object
export interface StripeSession {
  id: string;
  object: string;

  adaptive_pricing: AdaptivePricing;

  after_expiration: null;

  allow_promotion_codes: boolean | null;

  amount_subtotal: number;
  amount_total: number;

  automatic_tax: AutomaticTax;

  billing_address_collection: string | null;

  branding_settings: BrandingSettings;

  cancel_url: string;

  client_reference_id: string;

  client_secret: string | null;

  collected_information: CollectedInformation;

  consent: null;

  consent_collection: null;

  created: number;

  currency: string;

  currency_conversion: null;

  custom_fields: any[];

  custom_text: CustomText;

  customer: string | null;

  customer_account: string | null;

  customer_creation: string;

  customer_details: CustomerDetails;

  customer_email: string;

  discounts: any[];

  expires_at: number;

  invoice: string | null;

  invoice_creation: InvoiceCreation;

  livemode: boolean;

  locale: string | null;

  metadata: PaymentMetadata;

  mode: string;

  origin_context: null;

  payment_intent: string | null;

  payment_link: string | null;

  payment_method_collection: string;

  payment_method_configuration_details: PaymentMethodConfig;

  payment_method_options: PaymentMethodOptions;

  payment_method_types: string[];

  payment_status: string;

  permissions: null;

  phone_number_collection: PhoneNumberCollection;

  recovered_from: null;

  saved_payment_method_options: null;

  setup_intent: null;

  shipping_address_collection: null;

  shipping_cost: null;

  shipping_details: null;

  shipping_options: any[];

  status: string;

  submit_type: null;

  subscription: null;

  success_url: string;

  total_details: TotalDetails;

  ui_mode: string;

  url: string;

  wallet_options: null;
}

// ---- Nested Types ----

export interface AdaptivePricing {
  enabled: boolean;
}

export interface AutomaticTax {
  enabled: boolean;
  liability: null;
  provider: null;
  status: null;
}

export interface BrandingSettings {
  background_color: string;
  border_style: string;
  button_color: string;
  display_name: string;
  font_family: string;
  icon: BrandingFile;
  logo: BrandingFile;
}

export interface BrandingFile {
  file: string;
  type: string;
}

export interface CollectedInformation {
  business_name: string | null;
  individual_name: string | null;
  shipping_details: null;
}

export interface CustomText {
  after_submit: null;
  shipping_address: null;
  submit: null;
  terms_of_service_acceptance: null;
}

export interface CustomerDetails {
  address: null;
  business_name: null;
  email: string;
  individual_name: null;
  name: string | null;
  phone: string | null;
  tax_exempt: string;
  tax_ids: null;
}

export interface InvoiceCreation {
  enabled: boolean;
  invoice_data: InvoiceData;
}

export interface InvoiceData {
  account_tax_ids: null;
  custom_fields: null;
  description: null;
  footer: null;
  issuer: null;
  metadata: Record<string, any>;
  rendering_options: null;
}

export interface PaymentMetadata {
  city: string;
  lat: string;
  long: string;
  phone: string;
  street: string;
}

export interface PaymentMethodConfig {
  id: string;
  parent: null;
}

export interface PaymentMethodOptions {
  card: {
    request_three_d_secure: string;
  };
}

export interface PhoneNumberCollection {
  enabled: boolean;
}

export interface TotalDetails {
  amount_discount: number;
  amount_shipping: number;
  amount_tax: number;
}


export type CrediteOrderFields={
  fieldValues:CheckOutAddress;
  url:string;
}