
import React from 'react';
import { ShoppingBasket } from 'lucide-react';

interface PaymentButtonProps {
  price: number;
  label: string;
  onClick: () => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ 
  price, 
  label, 
  onClick,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 pb-3 bg-huriky-black border-0">
      <button
        className="telegram-button bg-huriky-yellow hover:bg-amber-500 text-black flex items-center justify-center"
        onClick={onClick}
      >
        <ShoppingBasket className="mr-2 h-5 w-5 text-black" />
        <span className="pt-[2px]">{`${label} - ${price}`} <span className='absolute ml-1 mt-[1px] text-sm'>⭐</span></span>
      </button>
    </div>
  );
};

export default PaymentButton;
