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
  const API_URL = `${BASE_API_URL}?pair=${symbol.toUpperCase()}&limit=20`;

  try {
    const response = await axios.get<Trade[]>(API_URL);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch data for ${symbol}`);
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return null;
  }
}

async function saveTrades(trades: Trade[]) {
  const stockDataArray = trades.map((trade) => ({
    s: trade.s,
    p: trade.p,
    q: trade.q,
    T: new Date(trade.T),
    m: trade.m,
  }));

  try {
    const savedStockData = await StockData.insertMany(stockDataArray);
    console.log("Stock data saved:", savedStockData);
    return savedStockData;
  } catch (err) {
    console.error("Error saving stock data:", err);
    return null;
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol") ?? "";

  if (!symbol || typeof symbol !== "string") {
    return NextResponse.json({ error: "Symbol is required" });
  }

  await connectToDatabase();

  const responseData = await fetchStockData(symbol);

  if (!responseData) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }

  const savedData = await saveTrades(responseData);

  if (!savedData) {
    return NextResponse.json({ error: "Failed to save data" });
  }
  return NextResponse.json(savedData);
}
