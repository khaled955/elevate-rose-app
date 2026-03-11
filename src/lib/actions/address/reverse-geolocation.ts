type ReverseGeocodeResponse = {
  message: string;
  city: string;
  country: string;
  displayName: string;
};

export async function reverseGeocodeAction(params: {
  lat: number;
  lon: number;
  locale: string;
  signal?: AbortSignal;
}): Promise<ReverseGeocodeResponse> {
  const url = new URL("/api/reverse-geocode", window.location.origin);
  url.searchParams.set("lat", String(params.lat));
  url.searchParams.set("lon", String(params.lon));
  url.searchParams.set("locale", params.locale);

  const res = await fetch(url.toString(), { signal: params.signal });

  if (!res.ok) {
    throw new Error("Reverse geocoding failed");
  }

  return res.json();
}
