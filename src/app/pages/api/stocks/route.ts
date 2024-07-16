import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../lib/mongodb";
import StockData from "../../../models/StockData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol } = req.query;

  await connectToDatabase();

  const data = await StockData.find({ symbol })
    .sort({ timestamp: -1 })
    .limit(20);
  res.status(200).json(data);
}
