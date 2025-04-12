import Header from '@/components/Header';
import SubscriptionCard from '@/components/SubscriptionCard';
import PlanFeatures from '@/components/PlanFeatures';
import AccountInfo from '@/components/AccountInfo';
import UserStats from '@/components/UserStats';
import ConnectionMethods from '@/components/ConnectionMethods';
import PaymentButton from '@/components/PaymentButton';
import KeyActivation from '@/components/KeyActivation';
import { Subscription, User, UserStatistics } from '@/types';
import { toast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, KeyRound } from 'lucide-react';
import SupportButton from '@/components/SupportButton';
// import { useQuery } from "@tanstack/react-query";
import { api } from '@/services/api';
import { useEffect, useState } from "react";

const Index = () => {
  const [userTelegramId, setUserTelegramId] = useState(null);
  const [userTelegramFirstName, setUserTelegramFirstName] = useState(null);
  const [userTelegramUsername, setUserTelegramUsername] = useState(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;

    const userId = tg.initDataUnsafe.user.id;
    const userName = tg.initDataUnsafe.user.first_name;
    const userUsername = tg.initDataUnsafe.user.username;

    setUserTelegramId(userId);
    setUserTelegramUsername(userUsername);
    setUserTelegramFirstName(userName);
  }, []);

  const buySubscription = async () => {
    if (userTelegramId && userTelegramUsername) {
      const result = await api.initSubscriptionInvoice(userTelegramId, userTelegramUsername, 30, 1);
      console.log(result);
    }
  }

  // Mock user data - in a real app this would come from API/backend
  const [user, setUser] = useState<User>({
    username: "Магомед",
    isActive: false,
    expiryDate: undefined,
    statistics: {
      daysLeft: 0,
      dataUsed: '8.5',
      dataLimit: '100',
      uptime: '2',
      lastConnection: undefined
    }
  });

  // Available subscription plans
  const subscriptions: Subscription[] = [
    { type: 'monthly', price: 1, isPopular: false },
    { type: 'quarterly', price: 2, isPopular: true },
    { type: 'yearly', price: 3, isPopular: false }
  ];

  const [selectedPlan, setSelectedPlan] = useState<Subscription | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [activeTab, setActiveTab] = useState("subscription");
  const [pendingKeyActivation, setPendingKeyActivation] = useState<string>("");
  const [selectedTarifCard, setSelectedTarifCard] = useState<string | null>(null);

  const handleSelectPlan = (plan: Subscription) => {
    if (plan.type === selectedTarifCard) {
      setSelectedPlan(null);
      setSelectedTarifCard(null);
    } else {
      setSelectedPlan(plan);
      setSelectedTarifCard(plan.type);
    }
  };

  const handlePayment = () => {
    if (!selectedPlan) return;
    
    setIsProcessingPayment(true);
    
    // Mock payment process - in a real app this would call payment API
    setTimeout(() => {
      setIsProcessingPayment(false);
      
      // Generate a mock activation key based on plan
      let activationKey = "";
      switch(selectedPlan.type) {
        case 'monthly':
          activationKey = "HN-M-" + Math.random().toString(36).substring(2, 10).toUpperCase() + "-" + Math.random().toString(36).substring(2, 10).toUpperCase();
          break;
        case 'quarterly':
          activationKey = "HN-Q-" + Math.random().toString(36).substring(2, 10).toUpperCase() + "-" + Math.random().toString(36).substring(2, 10).toUpperCase();
          break;
        case 'yearly':
          activationKey = "HN-Y-" + Math.random().toString(36).substring(2, 10).toUpperCase() + "-" + Math.random().toString(36).substring(2, 10).toUpperCase();
          break;
      }
      
      // Set the pending key for activation
      setPendingKeyActivation(activationKey);
      
      // Switch to activation tab
      setActiveTab("activation");
      
      toast({
        title: "Оплата успешна",
        description: `Ваш ключ: ${activationKey}. Пожалуйста, активируйте его.`,
      });
      
      setSelectedPlan(null);
    }, 2000);
  };

  const updateUserSubscription = (plan: Subscription | null, daysOverride?: number) => {
    // Update user data with new expiry date
    const today = new Date();
    let expiryDate = new Date();
    
    let daysToAdd = 0;
    if (daysOverride) {
      daysToAdd = daysOverride;
    } else if (plan) {
      if (plan.type === 'monthly') {
        daysToAdd = 30;
      } else if (plan.type === 'quarterly') {
        daysToAdd = 90;
      } else {
        daysToAdd = 365;
      }
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
      title: "Активация успешна",
      description: `Ваш тариф активирован до ${formattedDate}`,
    });
  };

  const handleKeyActivation = (days: number) => {
    updateUserSubscription(null, days);
    // Clear the pending key after activation
    setPendingKeyActivation("");
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
      
      <ScrollArea className="flex-1 pb-24 scrollbar-none">
        <div className="container max-w-md mx-auto px-4 py-6">

        <Header />
          
          <AccountInfo 
            username={userTelegramFirstName ?? userTelegramUsername} 
            expiryDate={user.expiryDate} 
            isActive={user.isActive} 
          />
          
          {user.isActive && (
            <UserStats statistics={user.statistics} isActive={user.isActive} />
          )}
          
          {!user.isActive ? (
            <Tabs defaultValue="subscription" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6 bg-huriky-black/80 border border-gray-800/40">
                <TabsTrigger value="subscription" className="flex items-center gap-2 data-[state=active]:bg-huriky-darkCard data-[state=active]:text-huriky-yellow">
                  <CreditCard className="w-5 h-5 -mt-[2px]" />
                  <span>Тарифы</span>
                </TabsTrigger>
                <TabsTrigger value="activation" className="flex items-center gap-2 data-[state=active]:bg-huriky-darkCard data-[state=active]:text-huriky-yellow">
                  <KeyRound className="w-5 h-5 -mt-[2px]" />
                  <span>Активация ключа</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="subscription">
                <h3 className="font-bold text-lg mb-3 text-white">Выберите тариф</h3>
                {subscriptions.map((sub) => (
                  <SubscriptionCard
                    key={sub.type}
                    isSelected={selectedTarifCard === sub.type}
                    type={sub.type}
                    price={sub.price}
                    isPopular={sub.isPopular}
                    onClick={() => handleSelectPlan(sub)}
                  />
                ))}
                <PlanFeatures />
              </TabsContent>
              
              <TabsContent value="activation">
                <KeyActivation 
                  onActivateSuccess={handleKeyActivation} 
                  initialKey={pendingKeyActivation}
                />
                <div className="mt-6">
                  <PlanFeatures />
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <>
              <ConnectionMethods />
              
              <Tabs defaultValue="subscription" value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
                <TabsList className="grid grid-cols-2 mb-6 bg-huriky-black border border-gray-800/40">
                  <TabsTrigger value="subscription" className="flex items-center gap-2 data-[state=active]:bg-huriky-darkCard data-[state=active]:text-huriky-yellow">
                    <CreditCard className="w-4 h-4" />
                    <span>Тарифы</span>
                  </TabsTrigger>
                  <TabsTrigger value="activation" className="flex items-center gap-2 data-[state=active]:bg-huriky-darkCard data-[state=active]:text-huriky-yellow">
                    <KeyRound className="w-4 h-4" />
                    <span>Активация ключа</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="subscription">
                  <div className="telegram-card mb-6">
                    <h3 className="font-bold text-lg mb-3">Продлить подписку</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      Ваша подписка активна до <span className='text-huriky-yellow'>{user.expiryDate}</span>
                      <br/>
                      Вы можете продлить её заранее, выбрав один из тарифов. Дни доступа добавятся к имеющимся.
                    </p>
                    {subscriptions.map((sub) => (
                      <SubscriptionCard
                        key={sub.type}
                        isSelected={selectedTarifCard === sub.type}
                        type={sub.type}
                        price={sub.price}
                        isPopular={sub.isPopular}
                        onClick={() => handleSelectPlan(sub)}
                      />
                    ))}
                  </div>
                  
                  <PlanFeatures />
                </TabsContent>
                
                <TabsContent value="activation">
                  <KeyActivation 
                    onActivateSuccess={handleKeyActivation}
                    initialKey={pendingKeyActivation}
                  />
                  <div className="mt-6">
                    <PlanFeatures />
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}

          <SupportButton />
        </div>
      </ScrollArea>
      
      {selectedPlan && activeTab === "subscription" && (
        <PaymentButton 
          price={selectedPlan.price}
          label={`Оплатить ${getPlanLabel(selectedPlan.type).toLowerCase()} доступ`}
          onClick={buySubscription}
          isProcessing={isProcessingPayment}
        />
      )}
    </div>
  );
};

export default Index;
