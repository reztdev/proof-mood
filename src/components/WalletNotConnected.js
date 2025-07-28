// src/components/WalletNotConnected.js
import React from 'react';
import { connectWallet } from '../utils/helpers';

const WalletNotConnected = ({ setAccount, setProvider, setSigner, setContract }) => {
  const handleConnect = async () => {
    const account = await connectWallet({
      setAccount,
      setProvider,
      setSigner,
      setContract
    });
    if (account) setAccount(account);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-400 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Proof of Mood</h1>
      <p className="mb-6 text-center max-w-md">
        Track your mood daily and build a streak of self-awareness. Connect your wallet to begin your journey!
      </p>
      <button
        onClick={handleConnect}
        className="bg-white text-blue-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default WalletNotConnected;
