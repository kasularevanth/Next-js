import mongoose, { Schema, Document } from 'mongoose';

interface IStockData extends Document {
  symbol: string;
  price: number;
  timestamp: Date;
}

const StockDataSchema: Schema = new Schema({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.StockData || mongoose.model<IStockData>('StockData', StockDataSchema);
