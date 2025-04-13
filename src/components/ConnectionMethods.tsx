
import React, { useState } from 'react';
import { Smartphone, Laptop, Monitor, Tablet, Download } from 'lucide-react';
import { ConnectionMethod } from '@/types';
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription, SheetClose } from '@/components/ui/sheet';

interface ConnectionMethodsProps {
  link: string;
}


const ConnectionMethods: React.FC<ConnectionMethodsProps> = ({ link }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  
  const methods: ConnectionMethod[] = [
    {
      id: 'android',
      name: 'Android',
      icon: 'Smartphone',
      description: 'V2Ray, Nekoray, Matsuri'
    },
    {
      id: 'ios',
      name: 'iOS',
      icon: 'Smartphone',
      description: 'Shadowrocket, V2Box, NapsternetV'
    },
    {
      id: 'windows',
      name: 'Windows',
      icon: 'Laptop',
      description: 'V2rayN, Nekoray, QV2ray'
    },
    {
      id: 'macos',
      name: 'MacOS',
      icon: 'Monitor',
      description: 'V2rayU, ClashX Pro, V2Box'
    },
    {
      id: 'linux',
      name: 'Linux',
      icon: 'Monitor',
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
          <Sheet key={method.id}>
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
                <p className='text-gray-50'>Для установки выполните следующие шаги:</p>
                <ol className="list-decimal pl-5 mt-3 space-y-2 text-gray-300">
                  <li>Скачайте и установите одно из приложений: {method.description}</li>
                  <li>Откройте приложение и нажмите «Добавить сервер» или аналог</li>
                  <li>Скопируйте конфигурацию ниже и вставьте в ваше приложение</li>
                </ol>
              </SheetDescription>
              
              <div className="telegram-card mt-4 relative">
                <button className="absolute top-3 right-3 p-2 rounded-full bg-huriky-glow">
                  <Download className="w-6 h-6 text-huriky-yellow" />
                </button>
                <p className="text-xs font-mono text-gray-300 pr-10 break-all">
                  {link}
                </p>
              </div>
              
              <div className="mt-5">
                <SheetClose asChild>
                  <button className="telegram-button bg-huriky-yellow hover:bg-amber-500 text-black">
                    Готово
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
