
import React, { useState, useEffect } from 'react';
import { KeyRound, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface KeyActivationProps {
  onActivateSuccess: (days: number) => void;
  initialKey?: string;
}

const KeyActivation: React.FC<KeyActivationProps> = ({ onActivateSuccess, initialKey = '' }) => {
  const [key, setKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Set the initial key if provided
  useEffect(() => {
    if (initialKey) {
      setKey(initialKey);
    }
  }, [initialKey]);

  const handleActivation = async () => {
    if (!key.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите ключ активации",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simulate activation process
    setTimeout(() => {
      // This would be an API call in a real application
      const isValid = key.length >= 8; // Simple validation for demo

      if (isValid) {
        // Calculate days based on key format
        let daysToAdd = 30; // Default

        if (key.startsWith('HN-M-')) {
          daysToAdd = 30; // Monthly
        } else if (key.startsWith('HN-Q-')) {
          daysToAdd = 90; // Quarterly
        } else if (key.startsWith('HN-Y-')) {
          daysToAdd = 365; // Yearly
        }
        
        toast({
          title: "Успешно!",
          description: `Ключ активирован на ${daysToAdd} дней`,
        });
        
        onActivateSuccess(daysToAdd);
        setKey('');
      } else {
        toast({
          title: "Ошибка",
          description: "Неверный ключ активации",
          variant: "destructive"
        });
      }
      
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="telegram-card">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-huriky-yellow/10 rounded-full flex items-center justify-center mr-2">
          <KeyRound className="w-4 h-4 text-huriky-yellow" />
        </div>
        <h3 className="font-bold text-lg">Активация ключа</h3>
      </div>
      
      <p className="text-sm text-gray-400 mb-4">
        Введите ключ активации для подключения или продления вашей подписки.<br/>Ключ придет на указанный при покупке тарифа email.
      </p>
      
      <div className="space-y-4">
        <Input
          placeholder="Введите ключ активации"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="bg-huriky-darkCard border-gray-900 text-white shadow-none outline-none placeholder:text-gray-600"
        />
        
        <Button 
          className="w-full bg-huriky-yellow hover:bg-amber-500 text-black flex items-center justify-center"
          disabled={isProcessing}
          onClick={handleActivation}
        >
          {isProcessing ? (
            "Активация..."
          ) : (
            <>
              Активировать ключ <ArrowRight className="ml-1 h-5 w-5 -mt-[2px]" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default KeyActivation;
