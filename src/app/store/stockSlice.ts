import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockState {
  symbol: string;
  data: { price: number; timestamp: Date }[];
}

const initialState: StockState = {
  symbol: 'bitcoin',
  data: [],
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setStockData(state, action: PayloadAction<{ price: number; timestamp: Date }[]>) {
      state.data = action.payload;
    },
    setSymbol(state, action: PayloadAction<string>) {
      state.symbol = action.payload;
    },
  },
});

export const { setStockData, setSymbol } = stockSlice.actions;
export default stockSlice.reducer;
