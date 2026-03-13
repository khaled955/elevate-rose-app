import { OCCASIONS } from "@/lib/services/apis/public-apis/occasions-apis.api";
import { NextResponse, type NextRequest } from "next/server";

type RouteProps = {
  params: { occassionId: string };
};

export async function GET(request: NextRequest, { params }: RouteProps) {
  const { occassionId } = params;

  // Guard-class
  if (!occassionId) {
    throw new Error("ocassion id is required");
  }

  const resp = await fetch(
    `${process.env.BASE_URL}${OCCASIONS.GET_CURRENT(occassionId)}`,
    
  );

  const payload = await resp.json();

  // return all data
  return NextResponse.json(payload);
}
