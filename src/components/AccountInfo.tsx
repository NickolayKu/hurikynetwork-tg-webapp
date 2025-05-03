
import React from 'react';
import { User, Clock, Shield, Info } from 'lucide-react';

interface AccountInfoProps {
  username?: string;
  expiryDate?: string;
  isActive?: boolean;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ 
  username = "Пользователь не определен", 
  expiryDate, 
  isActive = false 
}) => {
  return (
    <div className="telegram-card bg-telegram-card/30 border-huriky-glow mb-6">
      {isActive ? (
        <>
          <div className='flex justify-between'>
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-huriky-yellow/10 rounded-full flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-huriky-yellow" />
              </div>
              <div>
                <p className="text-xs text-gray-300">Пользователь:</p>
                <div className="font-bold text-white w-[30vw] overflow-hidden text-ellipsis">{username}</div>
              </div>
            </div>
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-huriky-yellow/10 rounded-full flex items-center justify-center mr-3">
                <Clock className="w-5 h-5 text-huriky-yellow" />
              </div>
              <div>
                <p className="text-xs text-gray-300">Подписка до:</p>
                <p className="font-bold text-huriky-yellow text-[16px]">{expiryDate}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-500/10 rounded-lg p-3 flex items-center justify-center gap-2 mt-1">
            <Shield className="w-5 h-5 text-green-400 -mt-[3px]" />
            <p className="text-sm text-white">Статус: <span className="font-bold text-green-400 pl-1">Подписка активна</span></p>
          </div>
        </>
      ) : (
        <>
          <div className='flex justify-between'>
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-huriky-yellow/10 rounded-full flex items-center justify-center mr-3">
                <User className="w-5 h-5 text-huriky-yellow" />
              </div>
              <div>
                <p className="text-xs text-gray-300">Пользователь:</p>
                <div className="font-bold text-white w-[30vw] overflow-hidden text-ellipsis">{username}</div>
              </div>
            </div>
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-huriky-yellow/10 rounded-full flex items-center justify-center mr-3">
                <Clock className="w-5 h-5 text-huriky-yellow" />
              </div>
              <div>
                <p className="text-xs text-gray-300">Подписка до:</p>
                <p className="font-bold text-huriky-yellow text-[16px]">{expiryDate || 'Нет'}</p>
              </div>
            </div>
          </div>
          <div className="bg-red-500/10 rounded-lg p-3 flex items-center justify-center gap-2 mb-3 mt-1">
            <Info className="w-5 h-5 text-red-400" />
            <p className="text-sm text-white mt-[2px]">Статус: <span className="font-bold text-red-400 pl-1">Нет активной подписки</span></p>
          </div>
          <p className="text-xs text-center text-white/50">Активируйте тариф для получения конфига и<br/>способов подключения</p>
        </>
      )}
    </div>
  );
};

export default AccountInfo;
