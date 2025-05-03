import React from 'react';
import { Button } from './ui/button';

interface UpdateTrafficButtonProps {
  handleBuyResetTraffic: () => void;
}

const UpdateTrafficButton: React.FC<UpdateTrafficButtonProps> = ({ handleBuyResetTraffic }) => {

  return (
    <div className="telegram-card bg-telegram-card/30 border-huriky-glow mb-4 -mt-3">
      <Button
        className="w-full bg-huriky-yellow hover:bg-amber-500 text-black flex items-center justify-center outline-none shadow-none"
        onClick={() => handleBuyResetTraffic()}
      >
        Обновить трафик — 100 <span className="tgico row-icon-stars-color text-black relative -mt-[2px] -ml-1"></span>
      </Button>
    </div>
  );
};

export default UpdateTrafficButton;