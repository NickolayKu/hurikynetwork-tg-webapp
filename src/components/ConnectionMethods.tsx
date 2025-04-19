/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Smartphone, Laptop, Monitor, Tablet, CopyIcon } from 'lucide-react';
import { ConnectionMethod } from '@/types';
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription, SheetClose } from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';

interface ConnectionMethodsProps {
  links: string[];
}

const ConnectionMethods: React.FC<ConnectionMethodsProps> = ({ links }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(links.join('\n'));
      toast({
        title: "Конфигурация скопирована в буфер обмена",
      });
    } catch (err) {
      toast({
        title: "Устройство не поддерживает копирование в буфер обмена",
      });
    }
  };
  
  const methods: ConnectionMethod[] = [
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
          title: 'v2RayTun',
          link: 'https://play.google.com/store/apps/details?id=com.v2raytun.android&hl=ru',
        },
        {
          title: 'HiddifyNG',
          link: 'https://play.google.com/store/apps/details?id=ang.hiddify.com&hl=ru',
        },
      ],
      description: 'v2rayNG, v2RayTun, HiddifyNG'
    },
    {
      id: 'ios',
      name: 'iOS',
      icon: 'Smartphone',
      apps: [
        {
          title: 'Streisand',
          link: 'https://apps.apple.com/ru/app/streisand/id6450534064',
        },
        {
          title: 'Shadowrocket',
          link: 'https://apps.apple.com/ru/app/shadowrocket/id932747118',
        },
        {
          title: 'Npv Tunnel',
          link: 'https://apps.apple.com/ru/app/npv-tunnel/id1629465476',
        },
      ],
      description: 'Streisand, Shadowrocket, Npv Tunnel'
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
      description: 'V2rayN, Nekoray, QV2ray'
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
      description: 'Streisand, V2rayU, ClashX Pro'
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
      description: 'Nekoray, Qv2ray, Clash'
    }
  ];
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-huriky-yellow" />;
      case 'Laptop': return <Laptop className="w-6 h-6 text-huriky-yellow" />;
      case 'Monitor': return <Monitor className="w-6 h-6 text-huriky-yellow" />;
      case 'Tablet': return <Tablet className="w-6 h-6 text-huriky-yellow" />;
      default: return <Smartphone className="w-6 h-6 text-huriky-yellow" />;
    }
  };

  return (
    <div className="mb-6">
      <h3 className="font-bold text-lg mb-4">Способы подключения</h3>
      
      <div className="space-y-3">
        {methods.map((method) => (
          <Sheet key={method.id} onOpenChange={(open: boolean) => !open && setSelectedMethod(null)}>
            <SheetTrigger asChild>
              <div 
                className={`connection-method ${selectedMethod === method.id ? 'active' : ''}`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="w-12 h-12 rounded-full bg-huriky-glow flex items-center justify-center mr-3">
                  {getIcon(method.icon)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{method.name}</h4>
                  <p className="text-xs text-gray-400">{method.description}</p>
                </div>
              </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-telegram-bg text-white border-0 rounded-t-2xl">
              <SheetTitle className="text-huriky-yellow flex items-center gap-2">
                {getIcon(method.icon)}
                Подключение для {method.name}
              </SheetTitle>
              <SheetDescription className="mt-6">
                <p className='text-gray-50'>Для подключения выполните следующие шаги:</p>
                <ol className="list-decimal pl-5 mt-3 space-y-2 text-gray-300">
                  <li>
                    Скачайте и установите на своё устройство одно из приложений: {' '}
                    {method.apps.map((item: any, index: number) => {
                      return (
                        <>
                          <a key={index} className='text-sky-500 hover:text-sky-600 font-bold' target='_blank' href={item.link}>{item.title}</a>
                          {index !== (method.apps.length - 1) && ', '}
                        </>
                      );
                    })}
                  </li>
                  <li>Скопируйте конфигурацию в буфер обмена по кнопке ниже</li>
                  <li>Откройте установленное приложение, нажмите «Добавить» или «+» и выберите «Добавить из буфера обмена»</li>
                </ol>
              </SheetDescription>
              
              {/* <div className='telegram-card h-auto outline-none shadow-none mt-4 w-full text-xs font-mono text-gray-300 overflow-hidden break-all'>
                {links.join('\n')}
              </div> */}
              
              <div className="mt-6">
                <SheetClose asChild>
                  <button className="telegram-button bg-huriky-yellow hover:bg-amber-500 text-black flex items-center justify-center outline-none shadow-none" 
                    onClick={() => copyToClipboard()}>
                    <CopyIcon className="w-5 h-5 mr-2" /> Скопировать конфигурацию
                  </button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
};

export default ConnectionMethods;
