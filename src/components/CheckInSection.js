// src/components/CheckInSection.js
import React from 'react';
import { moods } from '../utils/constants';

const CheckInSection = ({
  selectedMood,
  setSelectedMood,
  onCheckIn,
  loading,
  txHash,
  error,
  hasCheckedInToday
}) => {
  const handleMoodClick = (mood) => {
    if (!hasCheckedInToday) {
      setSelectedMood(mood);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mt-8">
      <h2 className="text-xl font-bold text-white mb-4">{hasCheckedInToday ? 'You have already checked in today!' : 'How are you feeling today?'}</h2>
      <div className="flex justify-center flex-wrap gap-4 mb-4">
        {moods.map((mood) => (
          <button
            key={mood.level}
            className={`text-3xl p-3 rounded-full border-2 transition-all ${
              selectedMood?.level === mood.level
                ? 'bg-white text-black border-white'
                : 'text-white border-white hover:bg-white hover:text-black'
            }`}
            onClick={() => handleMoodClick(mood)}
            disabled={hasCheckedInToday}
          >
            {mood.icon}
          </button>
        ))}
      </div>
      {!hasCheckedInToday && (
        <button
          onClick={onCheckIn}
          disabled={!selectedMood || loading}
          className="bg-white text-blue-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition disabled:opacity-50"
        >
          {loading ? 'Checking In...' : 'Check In'}
        </button>
      )}
      {txHash && (
        <p className="text-sm text-green-300 mt-4">
          ✅ Successfully checked in!{' '}
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View on Etherscan
          </a>
        </p>
      )}
      {error && <p className="text-sm text-red-300 mt-2">{error}</p>}
    </div>
  );
};

export default CheckInSection;
