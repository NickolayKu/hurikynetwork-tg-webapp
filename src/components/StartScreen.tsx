/* eslint-disable @typescript-eslint/no-explicit-any */
import { Zap } from 'lucide-react';
import React from 'react';

interface ScreenProps {
  handleClickNextScreen: () => void;
  isActive: boolean;
}

const StartScreen: React.FC<ScreenProps> = ({handleClickNextScreen, isActive}) => {

  return (
    <div className={`start-page-screen min-h-screen flex fixed top-0 left-0 right-0 px-5 flex-col items-center justify-center text-center w-full ${isActive ? 'active' : ''}`}>
      <div className="flex items-center -mt-16">
        <div className="w-10 h-12 flex items-center justify-center -ml-4">
          <Zap className="w-6 h-6 text-huriky-yellow animate-lightning-flash" />
        </div>
        <h1 className="text-gray-100 font-bold text-xl">
          <span className="text-huriky-yellow">Huriky</span>Network
        </h1>
      </div>

      <div className="font-bold text-lg mt-16 text-white">
        Безопасный доступ к интернету <br/>
        <span className="text-huriky-yellow"> за 4 простых шага</span> !
      </div>

      <p className="text-sm text-gray-400 mt-6">
        Следуйте шагам — и получите готовую конфигурацию для своего устройства
      </p>
      
      <div className='screen-footer fixed bottom-6 w-full px-6'>
        <button
          className="telegram-button bg-huriky-yellow hover:bg-amber-500 text-black flex items-center justify-center outline-none shadow-none w-full"
          onClick={() => handleClickNextScreen()}
        >
          Получить доступ
        </button>
      </div>
    </div>
  )
}

export default StartScreen;