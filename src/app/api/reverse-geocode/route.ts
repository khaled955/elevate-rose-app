import { NextResponse } from "next/server";

type NominatimReverseResponse = {
  display_name?: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    county?: string;
    state?: string;
    country?: string;
  };
};

function pickCity(address?: NominatimReverseResponse["address"]) {
  return (
    address?.city ||
    address?.town ||
    address?.village ||
    address?.municipality ||
    address?.county ||
    address?.state ||
    ""
  );
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const locale = searchParams.get("locale") || "en";

    if (!lat || !lon) {
      return NextResponse.json(
        { message: "lat and lon are required" },
        { status: 400 },
      );
    }

    // Basic validation
    const latNum = Number(lat);
    const lonNum = Number(lon);

    if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
      return NextResponse.json(
        { message: "lat/lon must be numbers" },
        { status: 400 },
      );
    }

    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("lat", String(latNum));
    url.searchParams.set("lon", String(lonNum));
    url.searchParams.set("zoom", "10");
    url.searchParams.set("addressdetails", "1");

    const res = await fetch(url.toString(), {
      headers: {
        // IMPORTANT: Nominatim wants identifiable requests.
        // Put your site name + a contact (email) if possible.
        "User-Agent": "flower.elevateegy.com (contact: support@elevateegy.com)",
        "Accept-Language": locale === "ar" ? "ar" : "en",
      },
      // optional caching:
      // cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to reverse geocode" },
        { status: 502 },
      );
    }

    const data = (await res.json()) as NominatimReverseResponse;

    const city = pickCity(data.address);
    const country = data.address?.country || "";
    const displayName =
      data.display_name || [city, country].filter(Boolean).join(", ") || "";

    return NextResponse.json({
      message: "success",
      city,
      country,
      displayName,
    });
  } catch (e) {
    void e
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
