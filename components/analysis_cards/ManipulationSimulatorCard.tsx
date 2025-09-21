
import React from 'react';
import type { ManipulationExample } from '../../types';
import { ManipulateIcon } from '../icons';

interface ManipulationSimulatorCardProps {
  examples: ManipulationExample[];
}

export const ManipulationSimulatorCard: React.FC<ManipulationSimulatorCardProps> = ({ examples }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
      <div className="flex items-center gap-3 mb-2">
        <ManipulateIcon className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-slate-800">Manipulation Simulator</h3>
      </div>
      <p className="text-slate-500 mb-6 text-sm">Learn how real content can be twisted. Here are AI-generated examples of manipulation techniques.</p>
      <div className="space-y-6">
        {examples.map((example, index) => (
          <div key={index}>
            <h4 className="font-bold text-slate-700">{example.title}</h4>
            <p className="text-sm text-slate-600 mt-1 mb-4">{example.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-blue-400 bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-blue-800 mb-2">Original</p>
                <p className="text-slate-700">{example.original}</p>
              </div>
              <div className="border border-red-400 bg-red-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-red-800 mb-2">Manipulated</p>
                <p className="text-slate-700">{example.manipulated}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
