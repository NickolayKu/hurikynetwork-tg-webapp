
import React, { useState } from 'react';
import Header from '@/components/Header';
import SubscriptionCard from '@/components/SubscriptionCard';
import PlanFeatures from '@/components/PlanFeatures';
import AccountInfo from '@/components/AccountInfo';
import UserStats from '@/components/UserStats';
import ConnectionMethods from '@/components/ConnectionMethods';
import PaymentButton from '@/components/PaymentButton';
import { Subscription, User, UserStatistics } from '@/types';
import { toast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const Index = () => {
  // Mock user data - in a real app this would come from API/backend
  const [user, setUser] = useState<User>({
    username: "Пользователь Telegram",
    isActive: false,
    expiryDate: undefined,
    statistics: {
      daysLeft: 0,
      dataUsed: '0 GB',
      dataLimit: '100 GB',
      uptime: '0 дн.',
      lastConnection: undefined
    }
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
      
      let daysToAdd = 0;
      if (selectedPlan.type === 'monthly') {
        daysToAdd = 30;
      } else if (selectedPlan.type === 'quarterly') {
        daysToAdd = 90;
      } else {
        daysToAdd = 365;
      }
      
      expiryDate.setDate(today.getDate() + daysToAdd);
      
      const formattedDate = expiryDate.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      // Calculate new user statistics
      const newStats: UserStatistics = {
        daysLeft: daysToAdd,
        dataUsed: '0 GB',
        dataLimit: '100 GB',
        uptime: '0 дн.',
        lastConnection: new Date().toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        })
      };
      
      setUser({
        ...user,
        isActive: true,
        expiryDate: formattedDate,
        statistics: newStats
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
    <div className="min-h-screen bg-telegram-bg flex flex-col">
      <Header />
      
      <ScrollArea className="flex-1 pb-24 scrollbar-none">
        <div className="container max-w-md mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-6 text-huriky-yellow">VLESS VPN Доступ</h2>
          
          <AccountInfo 
            username={user.username} 
            expiryDate={user.expiryDate} 
            isActive={user.isActive} 
          />
          
          {user.isActive && (
            <UserStats statistics={user.statistics} isActive={user.isActive} />
          )}
          
          {!user.isActive ? (
            <>
              <h3 className="font-bold text-lg mb-3 text-white">Выберите тариф</h3>
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
          ) : (
            <>
              <ConnectionMethods />
              
              <div className="telegram-card mb-6">
                <h3 className="font-bold text-lg mb-3">Продлить подписку</h3>
                <p className="text-sm text-gray-400 mb-3">
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
            </>
          )}
          
          <PlanFeatures />
        </div>
      </ScrollArea>
      
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
