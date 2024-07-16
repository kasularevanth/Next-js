import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import connectToDatabase from '../../lib/mongodb';
import StockData from '../../models/StockData';

const BASE_API_URL = 'https://public.coindcx.com/market_data/trade_history';
interface Trade {
  p: number; // Price
  q: number; // Quantity
  s: string; // Symbol
  T: number; // Timestamp
  m: boolean; // Buyer Maker
}

async function fetchStockData(symbol: string) {
  const API_URL = `${BASE_API_URL}?pair=${symbol.toUpperCase()}T&limit=20`;
  
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();

    const symbols = ['B-MKR_USD', 'B-BTC_USD', 'B-BNB_USD', 'LTC_USDT', 'XRP_USDT'];
    const promises = symbols.map(async (symbol) => {
      const priceData = await fetchStockData(symbol);
      const latestTrade = priceData?.[0]; // Assuming the latest trade is the first in the array
      const price = latestTrade ? latestTrade.p : null; // Price field in the response

      // Assuming `T` is the timestamp in milliseconds, convert to Date
      const timestamp = latestTrade ? new Date(latestTrade.T) : new Date();

      return { symbol, price, timestamp };
    });

    const stockData = await Promise.all(promises);

    const data = stockData
      .filter(({ price }) => price !== null) // Filter out null prices
      .map(({ symbol, price, timestamp }) => ({
        symbol,
        price,
        timestamp,
      }));

    await StockData.insertMany(data);

    res.status(200).json({ message: 'Data fetched and stored successfully' });
  } catch (error) {
    console.error('Error in API handler:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
