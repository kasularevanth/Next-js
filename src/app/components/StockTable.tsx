"use client";
// StockTable.js
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index";
import { setStockData } from "../store/stockSlice";
import "./StockTable.css"; // Import CSS file

const StockTable: React.FC = () => {
  const dispatch = useDispatch();
  const { symbol, data } = useSelector((state: RootState) => state.stock);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          `/pages/api/fetchData?symbol=${symbol}`
        );
        dispatch(setStockData(response.data));
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData(); // Initial fetch
    const interval = setInterval(fetchStockData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup function to clear interval
  }, [symbol, dispatch]);

  return (
    <div className="stock-table-container">
      <h1>Real-Time Data for {symbol}</h1>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.p}</td>
              <td>{entry.t?.toUTCString() ?? ""}</td>{" "}
              {/* Assuming timestamp is now a Date */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
