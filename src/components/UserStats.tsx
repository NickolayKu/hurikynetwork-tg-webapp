/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Calendar, UploadCloud, Clock, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface UserStatsProps {
  usedTraffic: number;
  dataLimit: number;
  onlineAt: string;
  expireDays: number;
  expireHours: number;
  isActive: boolean;
}

const UserStats: React.FC<UserStatsProps> = ({ usedTraffic, dataLimit, onlineAt, expireDays, expireHours, isActive }) => {

  const usedDataPercentage = (usedTraffic / dataLimit) * 100;

  const formatDateStringToDDMMYYYY = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}.${month}.${year}`;
  }

  const getDaysText = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return `${count} день`;
    } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
        return `${count} дня`;
    } else {
        return `${count} дней`;
    }
  }

  const getHoursText = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return `${count} час`;
    } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
        return `${count} часа`;
    } else {
        return `${count} часов`;
    }
  }

  if (isActive) {
    return (
      <div className="space-y-3 mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          Ваша статистика
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="stats-card bg-telegram-card/30 border-huriky-glow pr-1">
            <div className="h-10 w-6 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-huriky-yellow" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Осталось времени</p>
              <p className="stats-value">{expireDays > 0 ? getDaysText(expireDays) : getHoursText(expireHours)}</p>
            </div>
          </div>
          
          <div className="stats-card bg-telegram-card/30 border-huriky-glow">
            <div className="h-10 w-6 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-huriky-yellow" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Последний вход</p>
              <p className="stats-value">{onlineAt ? formatDateStringToDDMMYYYY(onlineAt) : 'Нет'}</p>
            </div>
          </div>
        </div>
        
        <div className="telegram-card bg-telegram-card/30 border-huriky-glow p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <UploadCloud className="h-5 w-5 text-huriky-yellow" />
              <p className="text-xs text-gray-400 pl-1">Израсходовано трафика</p>
            </div>
            <p className="text-xs text-gray-200">
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
