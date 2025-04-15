import React from 'react';
import { Shield, Globe, Wifi, Lock, HeadsetIcon } from 'lucide-react';

const PlanFeatures: React.FC = () => {
  const features = [
    {
      text: 'Стабильная работа во всех регионах',
      icon: <Globe className="w-4 h-4 text-huriky-yellow" />
    },
    {
      text: 'Поддержка пользователей 24/7',
      icon: <HeadsetIcon className="w-4 h-4 text-huriky-yellow" />
    },
    {
      text: 'Высокая скорость соединения',
      icon: <Wifi className="w-4 h-4 text-huriky-yellow" />
    },
    {
      text: 'Поддержка всех типов устройств',
      icon: <Shield className="w-4 h-4 text-huriky-yellow" />
    },
    // {
    //   text: 'Доступ к отечественным сервисам из-за рубежа',
    //   icon: <Lock className="w-4 h-4 text-huriky-yellow" />
    // },
    {
      text: 'Отсутствие логов вашей активности',
      icon: <Lock className="w-4 h-4 text-huriky-yellow" />
    },
  ];

  return (
    <>
      <h3 className="font-bold text-lg mt-7 text-white">Преимущества VLESS доступа</h3>    
      <div className="telegram-card mt-3">
        <ul className="space-y-5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <div className="bg-huriky-darkCard rounded-full p-1.5 mr-3">
                {feature.icon}
              </div>
              <span className="text-sm">{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PlanFeatures;
