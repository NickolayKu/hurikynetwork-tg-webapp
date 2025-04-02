
import React from 'react';
import { ShoppingCart, Loader2, ShoppingBag, ShoppingBasket } from 'lucide-react';

interface PaymentButtonProps {
  price: number;
  label: string;
  onClick: () => void;
  isProcessing?: boolean;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ 
  price, 
  label, 
  onClick, 
  isProcessing = false 
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 pb-3 bg-huriky-black border-t border-gray-800/40">
      <button
        className="telegram-button bg-huriky-yellow hover:bg-amber-500 text-black flex items-center justify-center"
        onClick={onClick}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <Loader2 className="animate-spin mr-2 h-5 w-5 text-black" />
        ) : (
          <ShoppingBasket className="mr-2 h-5 w-5 text-black" />
        )}
        <span className="pt-[2px]">{isProcessing ? 'Обработка...' : `${label} - ${price} ₽`}</span>
      </button>
    </div>
  );
};

export default PaymentButton;
