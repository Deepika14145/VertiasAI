import React from 'react';

interface VerdictCardProps {
  trustScore: number;
}

const getScoreDetails = (score: number): { text: string; gradient: string } => {
  if (score <= 20) {
    return { text: 'Extremely Low Confidence', gradient: 'from-red-600 via-red-700 to-rose-900' };
  }
  if (score <= 40) {
    return { text: 'Low Confidence', gradient: 'from-orange-500 via-red-600 to-purple-800' };
  }
  if (score <= 60) {
    return { text: 'Moderate Confidence', gradient: 'from-yellow-400 via-purple-500 to-indigo-600' };
  }
  if (score <= 80) {
    return { text: 'High Confidence', gradient: 'from-indigo-500 via-cyan-500 to-green-400' };
  }
  return { text: 'Very High Confidence', gradient: 'from-cyan-400 via-teal-400 to-green-500' };
};

export const VerdictCard: React.FC<VerdictCardProps> = ({ trustScore }) => {
  const { text, gradient } = getScoreDetails(trustScore);

  return (
    <div className={`p-8 rounded-2xl bg-gradient-to-br ${gradient} shadow-2xl`}>
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-1">{text}</p>
        <p 
          className="text-8xl font-black text-white tracking-tighter"
          style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
        >
          {trustScore}
        </p>
        <p className="text-white/70 mt-1 font-medium">Trust Score (0-100)</p>
      </div>
    </div>
  );
};
