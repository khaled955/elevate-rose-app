// Single address
export type Address = {
  _id: string;
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
};

// API response
export type AddressesResponse = {
  message: "success";
  addresses: Address[];
};

export type AddressFields = {
  street: string;
  phone: string;
  city: string;
  long: string;
  lat: string;
  username: string;
};


export type AddressDraft = AddressFormFields & {
  lat: string;
  long: string;
  username: string;
};