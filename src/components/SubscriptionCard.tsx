
import React from 'react';
import { Award, UploadCloud, Wifi } from 'lucide-react';

interface SubscriptionCardProps {
  isSelected?: boolean;
  type: 'monthly' | 'quarterly' | 'yearly' | 'trial';
  price: number;
  isPopular?: boolean;
  onClick: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ 
  isSelected,
  type, 
  price, 
  isPopular = false,
  onClick 
}) => {
  const tg = window.Telegram.WebApp;
  const isDesktop = tg.platform === 'tdesktop';

  const typeTitles = {
    monthly: 'Месячный',
    quarterly: 'Квартальный',
    yearly: 'Годовой'
  };
  
  const typeDescriptions = {
    trial: '3 дня доступа',
    monthly: '30 дней доступа',
    quarterly: '90 дней доступа',
    yearly: '365 дней доступа'
  };
  
  const discount = {
    monthly: null,
    quarterly: '12%',
    yearly: '30%'
  };

  return (
    <div className={`telegram-card relative ${isDesktop ? 'py-3' : 'py-5'} mb-4 hover:bg-telegram-card/80 w-full transition-all cursor-pointer 
      border-2 hover:border-huriky-yellow ${type === 'trial' && 'border-huriky-yellow/30'}`} onClick={onClick}>
      {/* {isPopular && (
        <div className="absolute top-0 right-0 bg-huriky-yellow text-black text-xs font-bold py-1 px-2 rounded-bl-lg rounded-tr-md flex items-center gap-1">
          <Award className="w-3 h-3" /> САМЫЙ ПОПУЛЯРНЫЙ
        </div>
      )} */}

      {discount[type] && (
        <span className="absolute top-0 right-0 bg-green-900/50 text-green-400 text-[11px] font-bold px-3 rounded-bl-lg rounded-tr-md flex items-center gap-1">
          Экономия {discount[type]}
        </span>
      )}
      
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-1">
            {typeTitles[type]} {isPopular && <span className='pl-1 font-bold text-huriky-yellow'>ХИТ!</span>}
            {type === 'trial' && <p className="font-bold text-lg">Пробный</p>}
          </h3>
          <p className="text-sm text-gray-400">
            {typeDescriptions[type]}
          </p>
          {/* {discount[type] && (
            <span className="inline-block bg-green-900/30 text-green-400 text-xs font-semibold px-2 py-1 rounded mt-2">
              Экономия {discount[type]}
            </span>
          )} */}
        </div>
        
        <div className="text-right">
          {type !== 'trial' ? (
            <p className="font-bold text-xl text-huriky-yellow mr-6">{price} <span className="tgico text-xl row-icon-stars-color ml-1"></span></p>
          ) : (
            <p className="font-bold text-lg"><span className="text-huriky-yellow">Бесплатно</span></p>
          )}
        </div>
      </div>
      
      {/* {type !== 'trial' && (  
        <div className="telegram-divider"></div>
      )}
      {type !== 'trial' && (  
        <div className="flex items-center justify-start gap-6">
          <div className="flex items-center">
            <UploadCloud className="w-4 h-4 text-huriky-yellow mr-2" />
            <span className="text-[13px]">150 Гб в месяц</span>
          </div>
          <div className="flex items-center">
            <Wifi className="w-4 h-4 text-huriky-yellow mr-2" />
            <span className="text-[13px]">Скорость до 150 Мб/с</span>
          </div>
          <ArrowRight className="w-5 h-5 text-huriky-yellow" />
        </div>
      )} */}
    </div>
  );
};

export default SubscriptionCard;
