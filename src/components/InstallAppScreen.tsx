/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface ScreenProps {
  handleClickNextScreen: () => void;
  selectedDevice: string;
  handleClickPrevScreen: () => void;
  isActive: boolean;
}

const InstallAppScreen: React.FC<ScreenProps> = ({handleClickNextScreen, selectedDevice, handleClickPrevScreen, isActive}) => {
  const tg = window.Telegram.WebApp;
  const isDesktop = tg.platform === 'tdesktop';

  const methods = [
    {
      id: 'ios',
      name: 'iOS',
      icon: 'Smartphone',
      apps: [
        {
          title: 'Hiddify',
          link: 'https://apps.apple.com/ru/app/hiddify-proxy-vpn/id6596777532',
        },
        {
          title: 'Anywhere',
          link: 'https://apps.apple.com/ru/app/anywhere-vless-proxy/id6758235178?l=ru',
        },
      ],
      description: 'Устройства iPhone и iPad'
    },
    {
      id: 'android',
      name: 'Android',
      icon: 'Smartphone',
      apps: [
        {
          title: 'v2rayNG',
          link: 'https://play.google.com/store/apps/details?id=com.v2ray.ang&hl=ru',
        },
        {
          title: 'V2Box',
          link: 'https://play.google.com/store/apps/details?id=dev.hexasoftware.v2box&hl=ru',
        },
        {
          title: 'HiddifyNG',
          link: 'https://play.google.com/store/apps/details?id=ang.hiddify.com&hl=ru',
        },
      ],
      description: 'Смартфоны, планшеты и телевизоры'
    },
    {
      id: 'windows',
      name: 'Windows',
      icon: 'Laptop',
      apps: [
        {
          title: 'V2rayN',
          link: 'https://github.com/2dust/v2rayN/releases',
        },
        {
          title: 'Nekoray',
          link: 'https://github.com/MatsuriDayo/nekoray/releases',
        },
        {
          title: 'QV2ray',
          link: 'https://github.com/Qv2ray/Qv2ray/releases',
        },
      ],
      description: 'Ноутбуки и компьютеры'
    },
    {
      id: 'macos',
      name: 'MacOS',
      icon: 'Monitor',
      apps: [
        {
          title: 'Streisand',
          link: 'https://apps.apple.com/ru/app/streisand/id6450534064',
        },
        {
          title: 'V2rayU',
          link: 'https://apps.apple.com/ru/app/v2rayu/id1569046443',
        },
        {
          title: 'ClashX Pro',
          link: 'https://github.com/clashdownload/ClashX_Pro/releases',
        },
      ],
      description: 'Ноутбуки и компьютеры'
    },
    {
      id: 'linux',
      name: 'Linux',
      icon: 'Monitor',
      apps: [
        {
          title: 'Nekoray',
          link: 'https://github.com/MatsuriDayo/nekoray/releases',
        },
        {
          title: 'QV2ray',
          link: 'https://github.com/Qv2ray/Qv2ray/releases',
        },
        {
          title: 'Clash',
          link: 'https://github.com/fossabot/clash',
        },
      ],
      description: 'Ноутбуки, роутеры и компьютеры'
    }
  ];

  return (
    <div className={`start-page-screen min-h-screen flex fixed top-0 left-0 right-0 px-5 flex-col justify-end items-center pb-3 w-full ${isActive ? 'active' : ''}`}>
      <div className={`font-bold text-lg text-center px-4 fixed ${isDesktop ? 'top-6' : 'top-9'}`}>
        <div className="inline-block rounded-lg bg-gray-950/60 px-3 py-1 text-xs">
          <span className="text-huriky-yellow font-medium"><b>2</b> шаг из <b>4</b> — Приложение</span>
        </div>
        <div className="mt-2 px-4">
          Установите подходящее приложение для подключения
        </div>
        <p className="text-sm text-gray-400 mt-6">
          Если у вас уже есть подходящее приложение — можете сразу перейти дальше
        </p>
      </div>

      <div className="screen-footer fixed bottom-8 left-6 right-6">
        {methods.find((method) => method.id === selectedDevice)?.apps?.map((item: any, index: number) => {
          return (
            <a key={index} target='_blank' href={item.link} className="telegram-button select-app-button mb-3 bg-huriky-card hover:bg-huriky-card/50 text-sky-500 flex items-center justify-center outline-none shadow-none w-full">
              {item.title}
            </a>
          );
        })}

        <button 
          className="telegram-button mt-16 bg-huriky-yellow hover:bg-amber-500 text-black flex items-center justify-center outline-none shadow-none w-full"
          onClick={() => handleClickNextScreen()}>
          Продолжить
        </button>
        <button 
          className="telegram-button mt-3 bg-gray-600 hover:bg-gray-700 text-gray-100 flex items-center justify-center outline-none shadow-none w-full"
          onClick={() => handleClickPrevScreen()}>
          Вернуться назад
        </button>
      </div>
    </div>
  );
}

export default InstallAppScreen;