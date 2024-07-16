'use client'
// ChangeStockModal.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSymbol } from '../store/stockSlice';
import './ChangeStockModal.css'; // Import CSS file

const ChangeStockModal = () => {
  const [symbol, setSymbolInput] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // State to handle modal visibility
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setSymbol(symbol));
    setModalOpen(false);
  };

  return (
    <div>
      <button type="button" className="open-modal-button" onClick={() => setModalOpen(true)}>
        Change Stock/Crypto
      </button>

      <div id="changeStockModal" className={`modal ${modalOpen ? 'modal-show' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbolInput(e.target.value)}
            placeholder="Enter stock/crypto symbol"
          />
          <button type="button" onClick={handleSubmit}>
            Change
          </button>
        </div>
      </div>
    </div>

  );
};

export default ChangeStockModal;
