// src/components/Charts.js
import React from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { getMoodDistribution, getMonthlyCompletion, getAverageMood } from '../utils/moodUtils';
import { moods } from '../utils/constants';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-3">
        <p className="text-white font-medium">{`${label}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Charts = ({ moodHistory }) => {
  const moodData = getMoodDistribution(moodHistory, moods);
  const completion = getMonthlyCompletion(moodHistory);
  const averageMood = getAverageMood(moodHistory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Mood Distribution */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">Mood Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={moodData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {moodData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Mood Trend (Bar Chart) */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">Mood Trend (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={moodHistory.slice(-7)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="date" stroke="#fff" />
            <YAxis domain={[0, 5]} stroke="#fff" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="mood" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-white mt-4">Average Mood: <strong>{averageMood}</strong></p>
        <p className="text-white">Monthly Completion: <strong>{completion}%</strong></p>
      </div>
    </div>
  );
};

export default Charts;
