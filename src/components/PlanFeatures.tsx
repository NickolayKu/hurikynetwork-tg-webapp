
import React from 'react';
import { Check } from 'lucide-react';

const PlanFeatures: React.FC = () => {
  const features = [
    'Стабильная работа во всех регионах',
    'Неограниченная скорость соединения',
    'Поддержка всех устройств',
    'Доступ к заблокированным сайтам',
    'Отсутствие логов вашей активности',
    'Техническая поддержка 24/7'
  ];

  return (
    <div className="telegram-card my-4">
      <h3 className="font-bold text-lg mb-3">Особенности VPN</h3>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="bg-telegram-blue rounded-full p-1 mr-3 mt-0.5">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanFeatures;
