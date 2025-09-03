import React from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/use-wallet';
import { useToast } from '@/hooks/use-toast';
import { Wallet, ExternalLink } from 'lucide-react';

export default function WalletConnection() {
  const { isConnected, userAccount, isConnecting, connectWallet } = useWallet();
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      toast({
        title: 'Connection Failed',
        description: error instanceof Error ? error.message : 'Failed to connect wallet',
        variant: 'destructive',
      });
    }
  };

  const handleInstallMetaMask = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  return (
    <section className="glassmorphism rounded-xl p-6 space-y-4">
      <div className="text-center space-y-3">
        {!isConnected ? (
          <>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Wallet className="h-8 w-8 text-primary" />
              <h2 className="text-xl font-semibold">Connect Wallet</h2>
            </div>
            
            {typeof window !== 'undefined' && window.ethereum ? (
              <Button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover-lift"
              >
                {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">MetaMask not detected</p>
                <Button
                  onClick={handleInstallMetaMask}
                  variant="outline"
                  className="w-full py-3 rounded-xl font-semibold hover-lift"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Install MetaMask
                </Button>
              </div>
            )}
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Connect your wallet to start trading</p>
              <p>Supports: MetaMask, WalletConnect</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <h2 className="text-xl font-semibold text-green-400">Wallet Connected</h2>
            </div>
            
            <div className="glassmorphism rounded-lg p-4 space-y-2">
              <div className="text-sm text-muted-foreground">Connected Account</div>
              <div className="font-mono text-sm break-all">
                {userAccount?.slice(0, 6)}...{userAccount?.slice(-4)}
              </div>
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground mt-3">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Ethereum Mainnet
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
