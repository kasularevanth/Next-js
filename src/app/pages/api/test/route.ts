import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(
      "https://public.coindcx.com/market_data/trade_history?pair=B-BTC_USDT&limit=20"
    );
    console.log(response.data); // Log response data for debugging
    return NextResponse.json({ message: response.data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
