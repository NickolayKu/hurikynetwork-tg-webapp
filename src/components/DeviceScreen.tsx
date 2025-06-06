/* eslint-disable @typescript-eslint/no-explicit-any */
import { Laptop, Monitor, ServerIcon, Smartphone, Tablet, Zap } from 'lucide-react';
import React from 'react';

interface ScreenProps {
  handleClickNextScreen: (device: string) => void;
  isActive: boolean;
}

const DeviceScreen: React.FC<ScreenProps> = ({handleClickNextScreen, isActive}) => {
  const tg = window.Telegram.WebApp;
  const isDesktop = tg.platform === 'tdesktop';

  return (
    <div className={`start-page-screen min-h-screen flex fixed top-0 left-0 right-0 px-5 flex-col items-center justify-end pb-3 w-full ${isActive ? 'active' : ''}`}>

      <div className={`font-bold text-lg text-center fixed ${isDesktop ? 'top-6' : 'top-9'}`}>
        <div className="inline-block rounded-lg bg-gray-950/60 px-3 py-1 text-xs">
          <span className="text-huriky-yellow font-medium"><b>1</b> шаг из <b>4</b> — Устройство</span>
        </div>
        <div className='w-full mt-2'>
          С чего вы подключаетесь?
        </div>
      </div>
      <div className='fixed bottom-8 left-6 right-6'>
        <div className={`device-select-card w-full telegram-card hover:bg-telegram-card/80 ${isDesktop ? 'p-3' : 'p-4'} pr-2 hover:border-huriky-yellow`} 
          onClick={() => handleClickNextScreen('ios')}>
          <div className="w-12 h-12 rounded-full bg-huriky-glow flex items-center justify-center mr-4">
            <Smartphone className="w-6 h-6 text-huriky-yellow" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">iOS</h4>
            <p className="text-xs text-gray-400">Устройства iPhone и iPad</p>
          </div>
        </div>
        <div className={`device-select-card w-full telegram-card hover:bg-telegram-card/80 ${isDesktop ? 'p-3' : 'p-4'} pr-2 hover:border-huriky-yellow`}  
          onClick={() => handleClickNextScreen('android')}>
          <div className="w-12 h-12 rounded-full bg-huriky-glow flex items-center justify-center mr-4">
            <Tablet className="w-6 h-6 text-huriky-yellow" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">Android</h4>
            <p className="text-xs text-gray-400">Смартфоны, планшеты и телевизоры</p>
          </div>
        </div>
        <div className={`device-select-card w-full telegram-card hover:bg-telegram-card/80 ${isDesktop ? 'p-3' : 'p-4'} pr-2 hover:border-huriky-yellow`}  
          onClick={() => handleClickNextScreen('macos')}>
          <div className="w-12 h-12 rounded-full bg-huriky-glow flex items-center justify-center mr-4">
            <Laptop className="w-6 h-6 text-huriky-yellow" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">MacOS</h4>
            <p className="text-xs text-gray-400">Ноутбуки и компьютеры</p>
          </div>
        </div>
        <div className={`device-select-card w-full telegram-card hover:bg-telegram-card/80 ${isDesktop ? 'p-3' : 'p-4'} pr-2 hover:border-huriky-yellow`}  
          onClick={() => handleClickNextScreen('windows')}>
          <div className="w-12 h-12 rounded-full bg-huriky-glow flex items-center justify-center mr-4">
            <Monitor className="w-6 h-6 text-huriky-yellow" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">Windows</h4>
            <p className="text-xs text-gray-400">Ноутбуки и компьютеры</p>
          </div>
        </div>
        <div className={`device-select-card w-full telegram-card hover:bg-telegram-card/80 ${isDesktop ? 'p-3' : 'p-4'} pr-2 hover:border-huriky-yellow`}  
          onClick={() => handleClickNextScreen('linux')}>
          <div className="w-12 h-12 rounded-full bg-huriky-glow flex items-center justify-center mr-4">
            <ServerIcon className="w-6 h-6 text-huriky-yellow" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium">Linux</h4>
            <p className="text-xs text-gray-400">Ноутбуки, роутеры и компьютеры</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeviceScreen;