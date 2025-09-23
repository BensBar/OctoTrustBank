import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const StockTicker: React.FC = () => {
  const { darkMode } = useTheme();
  const [stocks, setStocks] = useState<StockData[]>([]);

  // Mock stock data generator
  const generateMockStocks = (): StockData[] => {
    const stockSymbols = [
      'OTBT', // OctoTrust Bank
      'AAPL',
      'GOOGL',
      'MSFT',
      'TSLA',
      'JPM',
      'BAC',
      'WFC',
      'GS',
      'MS',
      'C',
      'USB',
      'PNC',
      'TFC',
      'COF'
    ];

    return stockSymbols.map(symbol => {
      const basePrice = symbol === 'OTBT' ? 125.50 : Math.random() * 500 + 50;
      const change = (Math.random() - 0.5) * 10;
      const changePercent = (change / basePrice) * 100;

      return {
        symbol,
        price: Number(basePrice.toFixed(2)),
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2))
      };
    });
  };

  useEffect(() => {
    // Initialize with mock data
    setStocks(generateMockStocks());

    // Update every 5 seconds with new mock data
    const interval = setInterval(() => {
      setStocks(generateMockStocks());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatChange = (change: number) => 
    `${change >= 0 ? '+' : ''}${change.toFixed(2)}`;
  const formatChangePercent = (percent: number) =>
    `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;

  return (
    <div className={`w-full overflow-hidden ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-900 text-green-400'} py-2 border-t border-gray-700`}>
      <div className="animate-scroll-left flex whitespace-nowrap">
        {stocks.concat(stocks).map((stock, index) => (
          <div key={`${stock.symbol}-${index}`} className="inline-flex items-center mx-8">
            <span className="font-bold text-white mr-2">{stock.symbol}</span>
            <span className="mr-2">{formatPrice(stock.price)}</span>
            <span className={`mr-2 ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatChange(stock.change)}
            </span>
            <span className={`${stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ({formatChangePercent(stock.changePercent)})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;