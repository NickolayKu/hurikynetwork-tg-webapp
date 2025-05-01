import React from 'react';
import { Button } from './ui/button';

const PremiumBotButton: React.FC = () => {

  const handleOpenSupportChat = () => {
    const tg = window.Telegram.WebApp;
    tg.openTelegramLink("https://t.me/PremiumBot");
  }

  return (
    <div className="telegram-card bg-telegram-card/30 border-huriky-glow mt-3">
      <Button
        style={{ color: "#fecf16" }}
        className="w-full bg-sky-500/90 hover:bg-sky-600 flex items-center justify-center outline-none shadow-none"
        onClick={handleOpenSupportChat}
      >
        Купить звезды Telegram <span className="tgico row-icon-stars-color relative -mt-[1px] -ml-1"></span>
      </Button>
    </div>
  );
};

export default PremiumBotButton;