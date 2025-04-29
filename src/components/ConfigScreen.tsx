/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@/hooks/use-toast';
import { CopyIcon } from 'lucide-react';
import React from 'react';

interface ScreenProps {
  handleClickNextScreen: () => void;
  isActive: boolean;
  links: string[];
}

const ConfigScreen: React.FC<ScreenProps> = ({handleClickNextScreen, isActive, links}) => {
  const tg = window.Telegram.WebApp;
  const isDesktop = tg.platform === 'tdesktop';
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(links?.join('\n'));
      toast({
        title: "Конфигурация скопирована в буфер обмена",
      });
    } catch (err) {
      toast({
        title: "Устройство не поддерживает копирование в буфер обмена",
      });
    }
  };

  return (
    <div
      className={`start-page-screen min-h-screen flex fixed top-0 left-0 right-0 px-5 flex-col justify-end items-center pb-3 w-full ${
        isActive ? "active" : ""
      }`}
    >
      <div className={`font-bold text-lg text-center fixed ${isDesktop ? 'top-6' : 'top-9'}`}>
        <div className="inline-block rounded-lg bg-gray-950/60 px-3 py-1 text-xs">
          <span className="text-huriky-yellow font-medium"><b>4</b> из <b>4</b> шагов</span>
        </div>
        <div className="mt-2 px-4">
          Для подключения выполните на своем устройстве следующие действия
        </div>
        {/* <p className="text-sm text-gray-400 mt-6">
          Если у вас уже имеется другое приложение <br /> для поключения по
          протоколу VLESS, <br /> то этот шаг можно пропустить
        </p> */}
      </div>

      <ol className="list-decimal pl-6 space-y-4 text-gray-200">
        <li>Скопируйте конфигурацию в буфер обмена по кнопке ниже</li>
        <li>
          Откройте установленное приложение, нажмите «Добавить» или «+» и
          выберите «Добавить из буфера обмена»
        </li>
        <li>Выберите желаемый сервер из добавившегося списка и подключитесь</li>
      </ol>

      {links ? (
        <button className="telegram-button mt-6 bg-huriky-card hover:bg-huriky-card/50 text-sky-500 flex items-center justify-center outline-none shadow-none" 
          onClick={() => copyToClipboard()}>
          <CopyIcon className="w-5 h-5 mr-2" /> Скопировать конфигурацию
        </button>
      ) : null}

      <div className="screen-footer w-full mb-3">
        <button
          className="telegram-button mt-7 bg-huriky-yellow hover:bg-amber-500 text-black flex items-center justify-center outline-none shadow-none w-full"
          onClick={() => handleClickNextScreen()}
        >
          Готово
        </button>
      </div>
    </div>
  );
}

export default ConfigScreen;