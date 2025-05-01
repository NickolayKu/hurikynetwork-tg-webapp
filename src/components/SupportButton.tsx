import React from 'react';
import { Button } from './ui/button';

const SupportButton: React.FC = () => {

  const handleOpenSupportChat = () => {
    const tg = window.Telegram.WebApp;
    tg.openTelegramLink("https://t.me/Huriky");
  }

  return (
    <div className="telegram-card bg-telegram-card/30 border-huriky-glow mt-3">
      <Button
        className="w-full bg-sky-500/90 hover:bg-sky-600 text-white flex items-center justify-center outline-none shadow-none"
        onClick={handleOpenSupportChat}
      >
        Написать в техподдержку
      </Button>
    </div>
  );
};

export default SupportButton;