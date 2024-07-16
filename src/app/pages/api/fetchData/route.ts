import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import connectToDatabase from "../../../lib/mongodb";
import StockData from "../../../models/StockData";

const BASE_API_URL = "https://public.coindcx.com/market_data/trade_history";
interface Trade {
  p: number; // Price
  q: number; // Quantity
  s: string; // Symbol
  T: number; // Timestamp
  m: boolean; // Buyer Maker
}

async function fetchStockData(symbol: string) {
  console.log("VALUE", symbol);
  const API_URL = `${BASE_API_URL}?pair=${symbol.toUpperCase()}&limit=20`;

  try {
    const response = await axios.get<Trade[]>(API_URL);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch data for ${symbol}`);
    }
    console.log("PAINA", response);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return null;
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    console.log("YO CHJECK", searchParams);
    const value = searchParams.get("symbol") ?? "";
    console.log("VACHINDHIIII ROOI", value);
    // return NextResponse.json({ message: "Nen batike unna" });
    console.log("KINDA DATA", await fetchStockData(value));
    return NextResponse.json(await fetchStockData(value));
  } catch (error) {
    console.error("Error in API handler:", error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
