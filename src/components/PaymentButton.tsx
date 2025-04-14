
import React from 'react';

interface PaymentButtonProps {
  price: number;
  label: string;
  onClick: () => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ price, label, onClick }) => {
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

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 pb-3 bg-huriky-black border-0">
      <button
        className="telegram-button bg-huriky-yellow hover:bg-amber-500 text-black flex items-center justify-center"
        onClick={onClick}
      >
        <span className="pt-[2px]">{`${label} - ${getStarsText(price)}`}</span>
      </button>
    </div>
  );
};

export default PaymentButton;
