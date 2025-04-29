
import React from 'react';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center mb-5 rounded-lg">
      <div className="flex items-center">
        <div className="w-10 h-12 flex items-center justify-center -ml-4">
          <Zap className="w-6 h-6 text-huriky-yellow animate-lightning-flash" />
        </div>
        <h1 className="text-gray-100 font-bold text-xl">
          <span className="text-huriky-yellow">Huriky</span>Network
        </h1>
      </div>
    </header>
  );
};

export default Header;
