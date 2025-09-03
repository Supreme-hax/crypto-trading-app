import React from 'react';
import { Shield, Zap, Globe, DollarSign, TrendingUp, Lock } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: 'Secure Trading',
      description: 'Non-custodial wallet integration'
    },
    {
      icon: Zap,
      title: 'Fast Swaps',
      description: 'Lightning-fast token exchanges'
    },
    {
      icon: Globe,
      title: 'Multi-Chain',
      description: 'Ethereum, Solana, and more'
    },
    {
      icon: DollarSign,
      title: 'Best Prices',
      description: 'DEX aggregation for optimal rates'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Data',
      description: 'Live market prices and charts'
    },
    {
      icon: Lock,
      title: 'No KYC',
      description: 'Trade without identity verification'
    }
  ];

  return (
    <section className="glassmorphism rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-center mb-6">Platform Features</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="glassmorphism rounded-lg p-4 text-center space-y-2 hover-lift">
            <feature.icon className="h-8 w-8 mx-auto text-primary" />
            <h3 className="font-semibold text-sm">{feature.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="border-t border-border pt-4 mt-6">
        <div className="text-center space-y-2">
          <div className="text-sm font-semibold">Powered by</div>
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <span>🔗 CoinGecko API</span>
            <span>⚡ DEX Aggregators</span>
            <span>🔐 Web3 Security</span>
          </div>
        </div>
      </div>
    </section>
  );
}
