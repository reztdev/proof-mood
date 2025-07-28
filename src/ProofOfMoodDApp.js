import React, { useEffect, useState } from 'react';
import { getStoredWalletData, clearWalletData } from './utils/helpers';
import { fetchStatsFromContract, fetchMoodHistory } from './utils/moodUtils';
import { useCountdown } from './hooks/useCountdown';
import WalletNotConnected from './components/WalletNotConnected';
import DashboardHeader from './components/DashboardHeader';
import MoodStatsCards from './components/MoodStatsCards';
import Charts from './components/Charts';
import CheckInSection from './components/CheckInSection';

const ProofOfMoodDApp = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [lastCheckinTime, setLastCheckinTime] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [txHash, setTxHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
    fetchStatsFromContract(account).then(setUserStats);
    fetchMoodHistory(account).then(setMoodHistory);
  }, [account]);

  if (!account) {
    return (
      <WalletNotConnected
        setAccount={setAccount}
        setProvider={setProvider}
        setSigner={setSigner}
        setContract={setContract}
      />
    );
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
        selectedMoodObj={selectedMood}
        setSelectedMoodObj={setSelectedMood}
        onCheckIn={handleCheckIn}
      />
    </div>
  );
};

export default ProofOfMoodDApp;
