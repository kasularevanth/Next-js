import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StockState {
  symbol: string;
  data: { p: number; t: Date }[];
}

const initialState: StockState = {
  symbol: "B-BTC_USDT",
  data: [],
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setStockData(state, action: PayloadAction<{ p: number; t: Date }[]>) {
      state.data = action.payload;
    },
    setSymbol(state, action: PayloadAction<string>) {
      state.symbol = action.payload;
    },
  },
});

export const { setStockData, setSymbol } = stockSlice.actions;
export default stockSlice.reducer;
