import { useState, useCallback } from 'react';
import { useWallet } from './use-wallet';
import type { Token } from '@/lib/tokens';

interface TokenBalance {
  balance: string;
  balanceFormatted: string;
  symbol: string;
}

export function useTokenBalance() {
  const { userAccount, isConnected } = useWallet();
  const [balances, setBalances] = useState<{ [address: string]: TokenBalance }>({});
  const [isLoading, setIsLoading] = useState(false);

  const getBalance = useCallback((token: Token): TokenBalance | null => {
    return balances[token.address] || null;
  }, [balances]);

  const refreshBalance = useCallback(async (token: Token) => {
    if (!isConnected || !userAccount) return;

    setIsLoading(true);
    try {
      // Mock balance for demo - in real app, you'd query the blockchain
      const mockBalance = Math.random() * 100;
      const balance: TokenBalance = {
        balance: mockBalance.toString(),
        balanceFormatted: mockBalance.toFixed(6),
        symbol: token.symbol,
      };

      setBalances(prev => ({
        ...prev,
        [token.address]: balance,
      }));
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, userAccount]);

  const refreshAllBalances = useCallback(async (tokens: Token[]) => {
    for (const token of tokens) {
      await refreshBalance(token);
    }
  }, [refreshBalance]);

  return {
    getBalance,
    refreshBalance,
    refreshAllBalances,
    isLoading,
  };
}
