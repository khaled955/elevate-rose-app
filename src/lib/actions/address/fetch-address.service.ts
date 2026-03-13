export async function fetchAddressService() {
  const resp = await fetch(`/api/address`);
  const payload = resp.json();
  return payload;
}
