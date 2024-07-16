// src/app/page.js or src/app/index.js (or wherever your Home component is defined)
import { Suspense } from 'react';
import ChangeStockModal from './components/ChangeStockModal';
import ClientProvider from './components/ClientProvider';
import StockTable from './components/StockTable';


export default function Home() {
  return (
    <div className="home-container"> 
      <ClientProvider>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <ChangeStockModal />
          <StockTable />
          
        </Suspense>
      </ClientProvider>
  </div>
  );
}
