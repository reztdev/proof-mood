// src/utils/moodUtils.js
export const getAverageMood = (moodHistory) => {
  if (!moodHistory || moodHistory.length === 0) return '0.0';
  const sum = moodHistory.reduce((acc, entry) => acc + entry.mood, 0);
  return (sum / moodHistory.length).toFixed(1);
};

export const getMonthlyCompletion = (totalCheckins) => {
  return Math.round((totalCheckins / 30) * 100);
};

export const getMoodDistribution = (moodHistory = [], moods = []) => {
  if (!Array.isArray(moodHistory) || !Array.isArray(moods)) return [];

  const distribution = moods.map((mood) => ({
    name: mood.label,
    value: 0,
    color: mood.color,
  }));

  for (const entry of moodHistory) {
    const moodIndex = entry.moodLevel - 1;
    if (distribution[moodIndex]) {
      distribution[moodIndex].value += 1;
    }
  }

  return distribution;
};

export const fetchStatsFromContract = async (account) => {
  // Jika kamu ingin ambil dari smart contract asli, tambahkan logic ethers.js di sini
  // Tapi sekarang dummy aja dulu:
  return {
    totalCheckins: 3,
    currentStreak: 3,
    longestStreak: 3,
    totalMoodPoints: 12
  };
};

export const fetchMoodHistory = async (account) => {
  return [
    { mood: 3, timestamp: Date.now(), emoji: '😐', date: '2025-07-19', day: 'Sat' },
    { mood: 5, timestamp: Date.now() - 86400000, emoji: '😄', date: '2025-07-18', day: 'Fri' },
  ];
};
