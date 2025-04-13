/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Calendar, UploadCloud, Clock, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface UserStatsProps {
  usedTraffic: number;
  dataLimit: number;
  onlineAt: string;
  expireDays: any;
  isActive: boolean;
}

const UserStats: React.FC<UserStatsProps> = ({ usedTraffic, dataLimit, onlineAt, expireDays, isActive }) => {

  const usedDataPercentage = (usedTraffic / dataLimit) * 100;

  const formatDateStringToDDMMYYYY = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}.${month}.${year}`;
  }

  if (isActive) {
    return (
      <div className="space-y-4 mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-huriky-yellow" />
          Статистика
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="stats-card">
            <div className="h-10 w-10 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-huriky-yellow" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Осталось дней</p>
              <p className="stats-value">{expireDays}</p>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="h-10 w-10 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-huriky-yellow" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Последний вход</p>
              <p className="stats-value">{formatDateStringToDDMMYYYY(onlineAt)}</p>
            </div>
          </div>
        </div>
        
        <div className="telegram-card">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <UploadCloud className="h-4 w-4 text-huriky-yellow" />
              <p className="text-sm">Израсходовано трафика</p>
            </div>
            <p className="text-xs text-gray-400">
              {(usedTraffic / (1024 ** 3)).toFixed(2)} / {(dataLimit / (1024 ** 3)).toFixed(2)} Гб
            </p>
          </div>
          <Progress value={usedDataPercentage} className="h-2 bg-gray-700/50" />
        </div>
      </div>
    );
  }
};

export default UserStats;
