// src/ProofOfMoodDApp.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './abis/ProofOfMood.json';
import { getStoredWalletData, clearWalletData } from './utils/helpers';
import { fetchStatsFromContract, fetchMoodHistory } from './utils/moodUtils';
import { CONTRACT_ADDRESS } from './utils/constants';
import { useCountdown } from './hooks/useCountdown';
import WalletNotConnected from './components/WalletNotConnected';
import DashboardHeader from './components/DashboardHeader';
import MoodStatsCards from './components/MoodStatsCards';
import Charts from './components/Charts';
import CheckInSection from './components/CheckInSection';

const ProofOfMoodDApp = () => {
  const [account, setAccount] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [lastCheckinTime, setLastCheckinTime] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [txHash, setTxHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contract, setContract] = useState(null);
  const countdown = useCountdown(lastCheckinTime, hasCheckedInToday, setHasCheckedInToday);

  useEffect(() => {
    const stored = getStoredWalletData();
    if (stored.account) {
      setAccount(stored.account);
      setLastCheckinTime(stored.lastCheckinTime);
      setHasCheckedInToday(!stored.canCheckInToday);
      setUserStats(stored.userStats);
      setMoodHistory(stored.moodHistory);
    }
  }, []);

  useEffect(() => {
    if (!account) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    setContract(contractInstance);

    fetchStatsFromContract(account).then(setUserStats);
    fetchMoodHistory(account).then(setMoodHistory);
  }, [account]);

  const handleCheckIn = async () => {
    if (!selectedMood || !account || !contract) {
      setError("Please select a mood and ensure wallet is connected.");
      return;
    }

    try {
      setLoading(true);
      setError('');
      setTxHash('');

      const tx = await contract.checkIn(selectedMood.level);
      await tx.wait();

      const updatedHistory = await fetchMoodHistory(account);
      const updatedStats = await fetchStatsFromContract(account);

      setMoodHistory(updatedHistory);
      setUserStats(updatedStats);
      setLastCheckinTime(Date.now());
      setHasCheckedInToday(true);
      setTxHash(tx.hash);
    } catch (err) {
      setError(err.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  if (typeof window.ethereum === 'undefined') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-400 text-white p-4">
        <div className="text-6xl mb-4">🎭</div>
        <h1 className="text-3xl font-bold mb-4">Proof of Mood</h1>
        <p className="text-lg">Please install a wallet extension like MetaMask to continue.</p>
      </div>
    );
  }

  if (!account) {
    return <WalletNotConnected setAccount={setAccount} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-400 p-4">
      <DashboardHeader account={account} onDisconnect={() => {
        clearWalletData();
        setAccount(null);
      }} />
      <MoodStatsCards stats={userStats} countdown={countdown} />
      <Charts moodHistory={moodHistory} />
      <CheckInSection
        account={account}
        selectedMood={selectedMood}
        setSelectedMood={setSelectedMood}
        txHash={txHash}
        setTxHash={setTxHash}
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
        hasCheckedInToday={hasCheckedInToday}
        setHasCheckedInToday={setHasCheckedInToday}
        setMoodHistory={setMoodHistory}
        setUserStats={setUserStats}
        setLastCheckinTime={setLastCheckinTime}
        userStats={userStats}
        moodHistory={moodHistory}
        onCheckIn={handleCheckIn}
      />
    </div>
  );
};

export default ProofOfMoodDApp;
