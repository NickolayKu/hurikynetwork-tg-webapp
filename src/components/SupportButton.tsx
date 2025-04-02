import React from 'react';
import { Button } from './ui/button';

const SupportButton: React.FC = () => {

  const handleOpenSupportChat = () => {

  }

  return (
    <>
      <h3 className="font-bold text-lg mt-7 text-white">Техническая поддержка 24/7</h3>    
      <div className="telegram-card mt-3">
        <Button 
            className="w-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center"
            onClick={handleOpenSupportChat}
          >     
          Написать в Telegram
        </Button>
      </div>
    </>
  );
};

export default SupportButton;