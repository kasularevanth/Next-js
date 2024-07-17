import mongoose, { Schema, Document } from "mongoose";

interface IStockData extends Document {
  p: number; // Price
  q: number; // Quantity
  s: string; // Symbol
  T: number; // Timestamp
  m: boolean; // Buyer Maker
}

const StockDataSchema: Schema = new Schema({
  s: { type: String, required: true },
  p: { type: Number, required: true },
  q: { type: Number, required: true },
  m: { type: Boolean, required: true },
  T: { type: Date, default: Date.now },
});

export default mongoose.models.StockData ||
  mongoose.model<IStockData>("StockData", StockDataSchema);
