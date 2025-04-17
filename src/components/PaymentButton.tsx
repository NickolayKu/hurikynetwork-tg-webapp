import React, { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
//import { Input } from './ui/input';

interface PaymentButtonProps {
  price: number;
  label: string;
  onClick: (promocode?: string) => void;
  isOpened: boolean;
  handleCloseModal: () => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ price, label, onClick, isOpened, handleCloseModal }) => {
  const [promocode, setPromocode] = useState('');

  const getStarsText = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return `${count} звезда`;
    } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
        return `${count} звезды`;
    } else {
        return `${count} звезд`;
    }
  }

  const handleClickPayment = () => {
    handleCloseModal();
    onClick(promocode);
    setPromocode('');
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
              onClick={handleClickPayment}
            >
              <span className="pt-[2px]">{`${label} - ${getStarsText(
                price
              )}`}</span>
            </button>

            {/* <Input
              placeholder="Введите промокод при его наличии"
              value={promocode}
              onChange={(e) => setPromocode(e.target.value)}
              className="bg-huriky-darkCard border-huriky-glow border-2 rounded-lg text-white placeholder:text-gray-600 h-[50px]"
            /> */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PaymentButton;


{/* <div className="fixed bottom-0 left-0 right-0 p-4 py-5 bg-huriky-black border-0">
      <button
        className="telegram-button bg-huriky-yellow hover:bg-amber-500 text-black flex items-center justify-center"
        onClick={onClick}
      >
        <span className="pt-[2px]">{`${label} - ${getStarsText(price)}`}</span>
      </button>
    </div> */}