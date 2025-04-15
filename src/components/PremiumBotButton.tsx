import React from 'react';
import { Button } from './ui/button';

const PremiumBotButton: React.FC = () => {

  const handleOpenSupportChat = () => {
    const tg = window.Telegram.WebApp;
    tg.openTelegramLink("https://t.me/PremiumBot");
  }

  return (
    <>
      <h3 className="font-bold text-lg mt-7 text-white">Купить звезды Telegram</h3>
      <p className="text-sm text-gray-400 mb-3">
        Если у вас не получается купить звезды на iOS, то вы можете купить их в отдельном официальном боте
      </p>

      <div className="telegram-card mt-3">
        <Button 
            className="w-full bg-sky-500 hover:bg-sky-600 text-yellow-300 flex items-center justify-center"
            onClick={handleOpenSupportChat}
          >     
          Перейти в Premium Bot
        </Button>
      </div>
    </>
  );
};

export default PremiumBotButton;