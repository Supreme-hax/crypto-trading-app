import { useState, useCallback, useEffect } from 'react';

interface PriceData {
  [key: string]: number;
}

export function useCryptoPrices() {
  const [prices, setPrices] = useState<PriceData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrices = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,uniswap,chainlink,matic-network&vs_currencies=usd&include_24hr_change=true'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch prices');
      }
      
      const data = await response.json();
      
      const formattedPrices: PriceData = {};
      Object.keys(data).forEach(key => {
        formattedPrices[key] = data[key].usd;
      });
      
      setPrices(formattedPrices);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startPriceUpdates = useCallback(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [fetchPrices]);

  return {
    prices,
    isLoading,
    lastUpdated,
    fetchPrices,
    startPriceUpdates,
  };
}
