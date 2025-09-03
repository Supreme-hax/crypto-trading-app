import React from 'react';
import { useWallet } from '@/hooks/use-wallet';
import { useCryptoPrices } from '@/hooks/use-crypto-prices';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export default function PortfolioSection() {
  const { isConnected } = useWallet();
  const { prices, isLoading } = useCryptoPrices();

  const mockPortfolio = [
    { symbol: 'ETH', name: 'Ethereum', balance: '0.5234', value: prices.ethereum || 0 },
    { symbol: 'USDC', name: 'USD Coin', balance: '1,250.00', value: 1 },
    { symbol: 'UNI', name: 'Uniswap', balance: '45.2', value: prices.uniswap || 0 },
  ];

  const totalValue = mockPortfolio.reduce((sum, token) => {
    return sum + (parseFloat(token.balance.replace(',', '')) * token.value);
  }, 0);

  return (
    <section className="glassmorphism rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center">
          <Wallet className="h-5 w-5 mr-2" />
          Portfolio
        </h2>
        {isConnected && (
          <div className="text-right">
            <div className="text-2xl font-bold">
              ${isLoading ? '...' : totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground">Total Balance</div>
          </div>
        )}
      </div>

      {!isConnected ? (
        <div className="text-center py-8 text-muted-foreground">
          <Wallet className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Connect your wallet to view portfolio</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mockPortfolio.map((token) => (
            <div key={token.symbol} className="glassmorphism rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                      {token.symbol[0]}
                    </div>
                    <div>
                      <div className="font-semibold">{token.name}</div>
                      <div className="text-sm text-muted-foreground">{token.symbol}</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold">{token.balance}</div>
                  <div className="text-sm text-muted-foreground">
                    ${isLoading ? '...' : (parseFloat(token.balance.replace(',', '')) * token.value).toFixed(2)}
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex items-center justify-between text-sm">
                <div className="text-muted-foreground">
                  ${isLoading ? '...' : token.value.toFixed(2)}
                </div>
                <div className="flex items-center space-x-1 text-green-400">
                  <TrendingUp className="h-3 w-3" />
                  <span>+2.4%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
