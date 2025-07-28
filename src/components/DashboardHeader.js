// src/components/DashboardHeader.js
import React from 'react';
import { LogOut } from 'lucide-react';

const DashboardHeader = ({ account, onDisconnect }) => {
  const shortAddress = account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Not Connected';

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/20 shadow-md">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Proof of Mood</h1>
        <p className="text-sm text-white/80">Connected Wallet: {shortAddress}</p>
      </div>
      <button
        onClick={onDisconnect}
        className="mt-4 md:mt-0 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-medium transition"
      >
        <LogOut size={18} />
        Disconnect Wallet
      </button>
    </div>
  );
};

export default DashboardHeader;
