// src/utils/constants.js
export const CONTRACT_ADDRESS = '0xdA8DFdf0c8fc85aeCecF19d26D0EBB84173Fb2Ec';
export const SEPOLIA_CHAIN_ID = '0xaa36a7';
export const CHECKIN_RESET_HOUR = 6;

export const STORAGE_KEYS = {
  WALLET: 'pom_wallet_address',
  USER_DATA: 'pom_user_data',
  MOOD_HISTORY: 'pom_mood_history',
  LAST_CHECKIN: 'pom_last_checkin'
};

export const moods = [
  { level: 1, label: '😞 Very Sad', color: '#6366f1', icon: '😞' },
  { level: 2, label: '😕 Sad', color: '#8b5cf6', icon: '😕' },
  { level: 3, label: '😐 Neutral', color: '#facc15', icon: '😐' },
  { level: 4, label: '🙂 Happy', color: '#4ade80', icon: '🙂' },
  { level: 5, label: '😄 Very Happy', color: '#22d3ee', icon: '😄' }
];