import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import type { XaiDataPoint } from '../../types';
import { DashboardIcon } from '../icons';

interface XaiDashboardCardProps {
  data: XaiDataPoint[];
}

export const XaiDashboardCard: React.FC<XaiDashboardCardProps> = ({ data }) => {
  const formattedData = data.map(item => ({
    subject: item.subject,
    score: item.value,
    fullMark: 100,
  }));

  return (
    <div className="glassmorphic-card p-6 rounded-2xl border-t-4 border-cyan-500/50">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-cyan-900/50 text-cyan-400 rounded-lg">
            <DashboardIcon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-slate-100">Explainable AI (XAI) Dashboard</h3>
      </div>
      <p className="text-slate-400 mb-4 text-sm">This chart visualizes the key factors in our analysis. A score closer to the edge indicates higher performance in that area.</p>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={formattedData}>
            <PolarGrid stroke="rgba(71, 85, 105, 0.6)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 14, fontFamily: 'Inter' }} />
            <Radar 
              name="Analysis Score" 
              dataKey="score" 
              stroke="var(--accent-cyan)"
              fill="var(--accent-cyan)"
              fillOpacity={0.5} 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(13, 17, 23, 0.8)',
                borderColor: 'var(--border-color)',
                borderRadius: '0.5rem',
                fontFamily: 'Inter',
              }}
              labelStyle={{ color: '#f1f5f9' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
