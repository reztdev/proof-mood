// src/utils/helpers.js
import { ethers } from 'ethers';
import contractAbi from '../abis/ProofOfMood.json';
import { SEPOLIA_CHAIN_ID, CONTRACT_ADDRESS, CHECKIN_RESET_HOUR, STORAGE_KEYS } from './constants';

export const checkInMood = async ({
  selectedMood,
  account,
  setLoading,
  setError,
  setTxHash,
  setHasCheckedInToday,
  setLastCheckinTime,
  setMoodHistory,
  setUserStats,
  userStats,
  moodHistory,
  lastCheckinTime
}) => {
  if (!selectedMood || !account) {
    setError('Please select a mood and ensure wallet is connected');
    return;
  }

  try {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);

    const tx = await contract.checkIn(selectedMood.level);
    const receipt = await tx.wait();
    const now = Date.now();

    const newMoodEntry = {
      day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
      mood: selectedMood.level,
      emoji: selectedMood.emoji,
      date: new Date().toISOString().split('T')[0],
      timestamp: now,
      txHash: receipt.transactionHash
    };

    const newStats = {
      ...userStats,
      totalCheckins: userStats.totalCheckins + 1,
      totalMoodPoints: userStats.totalMoodPoints + selectedMood.level
    };

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(CHECKIN_RESET_HOUR, 0, 0, 0);

    if (userStats && userStats.currentStreak && lastCheckinTime && lastCheckinTime >= yesterday.getTime()) {
      newStats.currentStreak = userStats.currentStreak + 1;
    } else {
      newStats.currentStreak = 1;
    }

    newStats.longestStreak = Math.max(newStats.longestStreak, newStats.currentStreak);

    setHasCheckedInToday(true);
    setLastCheckinTime(now);
    const updatedHistory = [...moodHistory.slice(-6), newMoodEntry];
    setMoodHistory(updatedHistory);
    setUserStats(newStats);
    setTxHash(receipt.transactionHash);

    localStorage.setItem(STORAGE_KEYS.LAST_CHECKIN, now.toString());
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(newStats));
    localStorage.setItem(STORAGE_KEYS.MOOD_HISTORY, JSON.stringify(updatedHistory));
  } catch (error) {
    if (error.code === 4001) {
      setError('Transaction was rejected by user');
    } else {
      setError(error.message || 'Check-in failed. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};

export const connectWallet = async (setters, storageKeys) => {
  const { setAccount, setProvider, setSigner, setContract, setError, setLoading, setIsConnecting } = setters;

  if (setIsConnecting) setIsConnecting(true);
  if (setLoading) setLoading(true);
  try {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      throw new Error('MetaMask is not installed. Please install MetaMask wallet extension.');
    }

    const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await ethProvider.send('eth_requestAccounts', []);
    const network = await ethProvider.getNetwork();

    if (network.chainId !== parseInt(SEPOLIA_CHAIN_ID, 16)) {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_ID }]
      });
    }

    const account = accounts[0];
    const signer = ethProvider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi, signer);

    setAccount(account);
    setProvider(ethProvider);
    setSigner(signer);
    setContract(contract);
    localStorage.setItem(storageKeys.WALLET, account);
  } catch (error) {
    if (setError) setError(error.message || 'Failed to connect wallet');
  } finally {
    if (setLoading) setLoading(false);
    if (setIsConnecting) setIsConnecting(false);
  }
};

export const disconnectWallet = (setters, storageKeys) => {
  const { setAccount, setProvider, setSigner, setContract, setUserStats, setMoodHistory, setSelectedMood, setTxHash, setLastCheckinTime, setCountdown, setError, setHasCheckedInToday } = setters;

  setAccount(null);
  setProvider(null);
  setSigner(null);
  setContract(null);
  setUserStats({
    totalCheckins: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalMoodPoints: 0
  });
  setMoodHistory([]);
  setSelectedMood(null);
  setTxHash('');
  setLastCheckinTime(null);
  setCountdown('');
  setError('');
  setHasCheckedInToday(false);

  Object.values(storageKeys).forEach(key => localStorage.removeItem(key));
};

export const getStoredWalletData = () => {
  try {
    const wallet = localStorage.getItem(STORAGE_KEYS.WALLET);
    const userStats = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_DATA));
    const moodHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.MOOD_HISTORY));
    const lastCheckinTime = parseInt(localStorage.getItem(STORAGE_KEYS.LAST_CHECKIN));
    const now = Date.now();

    const next6AM = new Date();
    next6AM.setUTCHours(CHECKIN_RESET_HOUR, 0, 0, 0);
    if (now > next6AM.getTime()) {
      next6AM.setUTCDate(next6AM.getUTCDate() + 1);
    }

    const canCheckInToday = !lastCheckinTime || now >= next6AM.getTime();
    return { account: wallet, userStats, moodHistory, lastCheckinTime, canCheckInToday };
  } catch (err) {
    return {};
  }
};

export const clearWalletData = () => {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
};
