// src/components/MoodStatsCards.js
import React from 'react';
import { Calendar, TrendingUp, Award, Clock } from 'lucide-react';

const MoodStatsCards = ({ stats, countdown }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card icon={<Calendar />} label="Total Check-ins" value={stats?.totalCheckins || 0} />
      <Card icon={<TrendingUp />} label="Current Streak" value={stats?.currentStreak || 0} />
      <Card icon={<Award />} label="Longest Streak" value={stats?.longestStreak || 0} />
      <Card icon={<Clock />} label="Next Check-in" value={countdown || '--:--:--'} />
    </div>
  );
};

const Card = ({ icon, label, value }) => (
  <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg text-white border border-white/20">
    <div className="flex items-center gap-3 mb-2">
      <div className="bg-white/20 p-2 rounded-full">{icon}</div>
      <h4 className="font-semibold text-sm">{label}</h4>
    </div>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default MoodStatsCards;
