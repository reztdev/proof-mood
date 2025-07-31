import React from 'react';

const DashboardHeader = ({ account, onDisconnect }) => {
  return (
    <div className="flex items-center justify-between mb-6 text-white">
      <div className="flex items-center space-x-3">
        <div className="text-6xl mb-4">🎭</div>
        <h1 className="text-2xl font-bold">Proof of Mood</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="bg-white/20 px-4 py-2 rounded-full">
          {account.slice(0, 6)}...{account.slice(-4)}
        </span>
        <button
          onClick={onDisconnect}
          className="bg-red-600 px-4 py-2 rounded-full text-white font-semibold hover:bg-red-700 transition"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
