
import React from 'react';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between bg-huriky-black p-4 sticky top-0 z-10 border-b border-gray-800/40 backdrop-blur-sm">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-huriky-yellow/10 rounded-full flex items-center justify-center mr-3 animate-pulse-yellow">
          <Zap className="w-6 h-6 text-huriky-yellow animate-lightning-flash" />
        </div>
        <h1 className="text-white font-bold text-xl">
          <span className="text-huriky-yellow">Huriky</span>Network
        </h1>
      </div>
    </header>
  );
};

export default Header;
