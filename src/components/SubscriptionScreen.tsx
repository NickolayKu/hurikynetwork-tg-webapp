/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import SubscriptionCard from './SubscriptionCard';
import { UploadCloud, Wifi } from 'lucide-react';

interface ScreenProps {
  subscriptions: any;
  handleClickNextScreen: (subscription: any) => void;
  handleClickPrevScreen: () => void;
  isActive: boolean;
}

const SubscriptionScreen: React.FC<ScreenProps> = ({handleClickNextScreen, handleClickPrevScreen, subscriptions, isActive}) => {
  const tg = window.Telegram.WebApp;
  const isDesktop = tg.platform === 'tdesktop';

  return (
    <div className={`start-page-screen min-h-screen flex fixed top-0 left-0 right-0 px-5 flex-col items-center justify-end pb-3 w-full ${isActive ? 'active' : ''}`}>
      <div className={`font-bold text-lg text-center fixed ${isDesktop ? 'top-6' : 'top-9'}`}>
        <div className="inline-block rounded-lg bg-gray-950/60 px-3 py-1 text-xs">
          <span className="text-huriky-yellow font-medium"><b>2</b> шаг из <b>4</b> — Тариф</span>
        </div>
        <div className="w-full mt-2 mb-2">Выберите подходящий тариф</div>
        <div className="flex items-center justify-center gap-6 w-full">
          <div className="flex items-center">
            <UploadCloud className="w-4 h-4 text-huriky-yellow mr-2" />
            <span className="text-[13px] text-gray-400">150 Гб в месяц</span>
          </div>
          <div className="flex items-center">
            <Wifi className="w-4 h-4 text-huriky-yellow mr-2" />
            <span className="text-[13px] text-gray-400">Скорость до 150 Мб/с</span>
          </div>
        </div>
      </div>

      <SubscriptionCard
        key={"trial"}
        isSelected={false}
        type={"trial"}
        price={0}
        isBigHeight={true}
        isPopular={false}
        onClick={() => handleClickNextScreen('trial')}
      />

      {subscriptions &&
        subscriptions?.map((sub: any) => (
          <SubscriptionCard
            key={sub.type}
            isSelected={false}
            type={sub.type}
            isBigHeight={true}
            price={sub.price}
            isPopular={sub.isPopular}
            onClick={() => handleClickNextScreen(sub)}
          />
        ))}

      <div className='screen-footer w-full mb-3'>
        <button
          className="telegram-button bg-gray-600 hover:bg-gray-700 text-gray-100 flex items-center justify-center outline-none shadow-none w-full"
          onClick={() => handleClickPrevScreen()}
        >
          Вернуться назад
        </button>
      </div>
    </div>
  );
}

export default SubscriptionScreen;