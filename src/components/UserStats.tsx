
import React from 'react';
import { Calendar, UploadCloud, Clock, Activity } from 'lucide-react';
import { UserStatistics } from '@/types';
import { Progress } from '@/components/ui/progress';

interface UserStatsProps {
  statistics?: UserStatistics;
  isActive: boolean;
}

const UserStats: React.FC<UserStatsProps> = ({ statistics, isActive }) => {
  if (!isActive || !statistics) {
    return null;
  }

  statistics = {
    dataUsed: '8.5',
    dataLimit: '100',
    daysLeft: 28,
    uptime: '2',
  }

  const usedDataPercentage = parseFloat(statistics.dataUsed) / parseFloat(statistics.dataLimit) * 100;

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
            <p className="stats-value">{statistics.daysLeft}</p>
          </div>
        </div>
        
        <div className="stats-card">
          <div className="h-10 w-10 rounded-full flex items-center justify-center">
            <Clock className="h-5 w-5 text-huriky-yellow" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Время работы</p>
            <p className="stats-value">{statistics.uptime}</p>
          </div>
        </div>
      </div>
      
      <div className="telegram-card">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <UploadCloud className="h-4 w-4 text-huriky-yellow" />
            <p className="text-sm">Трафик</p>
          </div>
          <p className="text-xs text-gray-400">
            {statistics.dataUsed} / {statistics.dataLimit} Гб
          </p>
        </div>
        <Progress value={usedDataPercentage} className="h-2 bg-gray-700/50" />
      </div>
      
      {statistics.lastConnection && (
        <p className="text-xs text-gray-400 text-center">
          Последнее подключение: {statistics.lastConnection}
        </p>
      )}
    </div>
  );
};

export default UserStats;
