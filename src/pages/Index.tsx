
import React, { useState } from 'react';
import Header from '@/components/Header';
import SubscriptionCard from '@/components/SubscriptionCard';
import PlanFeatures from '@/components/PlanFeatures';
import AccountInfo from '@/components/AccountInfo';
import PaymentButton from '@/components/PaymentButton';
import { Subscription, User } from '@/types';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  // Mock user data - in a real app this would come from API/backend
  const [user, setUser] = useState<User>({
    username: "Пользователь Telegram",
    isActive: false,
    expiryDate: undefined
  });

  // Available subscription plans
  const subscriptions: Subscription[] = [
    { type: 'monthly', price: 299, isPopular: false },
    { type: 'quarterly', price: 799, isPopular: true },
    { type: 'yearly', price: 2899, isPopular: false }
  ];

  const [selectedPlan, setSelectedPlan] = useState<Subscription | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleSelectPlan = (plan: Subscription) => {
    setSelectedPlan(plan);
    
    // Scroll to the bottom to see the payment button
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handlePayment = () => {
    if (!selectedPlan) return;
    
    setIsProcessingPayment(true);
    
    // Mock payment process - in a real app this would call payment API
    setTimeout(() => {
      setIsProcessingPayment(false);
      
      // Update user data with new expiry date
      const today = new Date();
      let expiryDate = new Date();
      
      if (selectedPlan.type === 'monthly') {
        expiryDate.setDate(today.getDate() + 30);
      } else if (selectedPlan.type === 'quarterly') {
        expiryDate.setDate(today.getDate() + 90);
      } else {
        expiryDate.setDate(today.getDate() + 365);
      }
      
      const formattedDate = expiryDate.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      setUser({
        ...user,
        isActive: true,
        expiryDate: formattedDate
      });
      
      toast({
        title: "Оплата успешна",
        description: `Ваш тариф активирован до ${formattedDate}`,
      });
      
      setSelectedPlan(null);
    }, 2000);
  };

  // Format plan types in Russian for display
  const getPlanLabel = (type: string) => {
    switch(type) {
      case 'monthly': return 'Месячный';
      case 'quarterly': return 'Квартальный';
      case 'yearly': return 'Годовой';
      default: return type;
    }
  };

  return (
    <div className="pb-24 min-h-screen">
      <Header />
      
      <div className="container max-w-md mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">VLESS VPN Доступ</h2>
        
        <AccountInfo 
          username={user.username} 
          expiryDate={user.expiryDate} 
          isActive={user.isActive} 
        />
        
        {!user.isActive && (
          <>
            <h3 className="font-bold text-lg mb-3">Выберите тариф</h3>
            {subscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.type}
                type={sub.type}
                price={sub.price}
                isPopular={sub.isPopular}
                onClick={() => handleSelectPlan(sub)}
              />
            ))}
          </>
        )}
        
        <PlanFeatures />
        
        {user.isActive && (
          <div className="telegram-card">
            <h3 className="font-bold text-lg mb-3">Продлить подписку</h3>
            <p className="text-sm text-gray-600 mb-3">
              Ваша подписка активна до {user.expiryDate}. Вы можете продлить её заранее, выбрав один из тарифов:
            </p>
            {subscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.type}
                type={sub.type}
                price={sub.price}
                isPopular={sub.isPopular}
                onClick={() => handleSelectPlan(sub)}
              />
            ))}
          </div>
        )}
      </div>
      
      {selectedPlan && (
        <PaymentButton 
          price={selectedPlan.price}
          label={`Оплатить ${getPlanLabel(selectedPlan.type)} доступ`}
          onClick={handlePayment}
          isProcessing={isProcessingPayment}
        />
      )}
    </div>
  );
};

export default Index;
