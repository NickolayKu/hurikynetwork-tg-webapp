import React from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface TrialButtonProps {
  onClick: () => void;
  isOpened: boolean;
  handleCloseModal: () => void;
}

const TrialButton: React.FC<TrialButtonProps> = ({ onClick, isOpened, handleCloseModal }) => {

  const handleClickTrialButton = () => {
    handleCloseModal();
    onClick();
  }

  return (
    <Sheet key={'payment_modal'} open={isOpened} onOpenChange={() => isOpened ? handleCloseModal() : null}>
      <SheetContent
        showCloseIcon={false}
        side="bottom"
        className="bg-telegram-bg text-white border-0 rounded-t-2xl"
      >
        <div className="space-y-5">
          <button
            className="telegram-button bg-huriky-yellow hover:bg-amber-500 text-black flex items-center justify-center outline-none shadow-none"
            onClick={handleClickTrialButton}
          >
            <span className="pt-[2px]">Активировать пробный период</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TrialButton;