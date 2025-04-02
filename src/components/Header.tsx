
import React from 'react';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between bg-huriky-black p-4 sticky top-0 z-10">
      <div className="flex items-center">
        <div className="w-9 h-9 bg-huriky-black rounded-full flex items-center justify-center mr-3">
          <Zap className="w-6 h-6 text-huriky-yellow animate-lightning-flash" />
        </div>
        <h1 className="text-white font-bold text-xl">HurikyNetwork</h1>
      </div>
    </header>
  );
};

export default Header;
