
import React from 'react';
import { Check, Shield, Globe, Wifi, Lock, Clock, HeadsetIcon } from 'lucide-react';

const PlanFeatures: React.FC = () => {
  const features = [
    {
      text: 'Стабильная работа во всех регионах',
      icon: <Globe className="w-4 h-4 text-white" />
    },
    {
      text: 'Неограниченная скорость соединения',
      icon: <Wifi className="w-4 h-4 text-white" />
    },
    {
      text: 'Поддержка всех устройств',
      icon: <Shield className="w-4 h-4 text-white" />
    },
    {
      text: 'Доступ к заблокированным сайтам',
      icon: <Lock className="w-4 h-4 text-white" />
    },
    {
      text: 'Отсутствие логов вашей активности',
      icon: <Lock className="w-4 h-4 text-white" />
    },
    {
      text: 'Техническая поддержка 24/7',
      icon: <HeadsetIcon className="w-4 h-4 text-white" />
    }
  ];

  return (
    <div className="telegram-card my-6">
      <h3 className="font-bold text-lg mb-4">Особенности VPN</h3>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="bg-huriky-yellow rounded-full p-1.5 mr-3 mt-0.5">
              {feature.icon}
            </div>
            <span className="text-sm">{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanFeatures;
