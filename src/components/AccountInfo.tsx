
import React from 'react';
import { Clock, User } from 'lucide-react';

interface AccountInfoProps {
  username?: string;
  expiryDate?: string;
  isActive?: boolean;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ 
  username = "Пользователь", 
  expiryDate, 
  isActive = false 
}) => {
  return (
    <div className="huriky-card mb-4">
      <div className="flex items-center mb-2">
        <User className="w-5 h-5 text-huriky-yellow mr-2" />
        <h3 className="font-medium text-white">{username}</h3>
      </div>
      
      {isActive ? (
        <div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-huriky-yellow mr-2" />
            <div>
              <p className="text-sm text-white">Активен до:</p>
              <p className="font-bold text-huriky-yellow">{expiryDate}</p>
            </div>
          </div>
          <div className="bg-green-500/20 rounded-lg p-2 mt-3">
            <p className="text-sm text-white text-center">Статус: <span className="font-bold text-green-400">Активен</span></p>
          </div>
        </div>
      ) : (
        <div className="bg-red-500/20 rounded-lg p-2">
          <p className="text-sm text-white text-center">Статус: <span className="font-bold text-red-400">Не активен</span></p>
          <p className="text-xs text-center text-white/70 mt-1">Выберите тариф для активации</p>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
