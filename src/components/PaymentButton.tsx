
import React from 'react';

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
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
      <button
        className="telegram-button flex items-center justify-center"
        onClick={onClick}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        <span>{isProcessing ? 'Обработка...' : `${label} - ${price} ₽`}</span>
      </button>
    </div>
  );
};

export default PaymentButton;
