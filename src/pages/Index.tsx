/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '@/components/Header';
import SubscriptionCard from '@/components/SubscriptionCard';
import PlanFeatures from '@/components/PlanFeatures';
import AccountInfo from '@/components/AccountInfo';
import UserStats from '@/components/UserStats';
import ConnectionMethods from '@/components/ConnectionMethods';
import PaymentButton from '@/components/PaymentButton';
import { Subscription } from '@/types';
import { toast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import SupportButton from '@/components/SupportButton';
import { useQuery } from "@tanstack/react-query";
import { api } from '@/services/api';
import { useEffect, useState } from "react";
import PremiumBotButton from '@/components/PremiumBotButton';
import { MetrikaCounter } from 'react-metrika';
import TrialButton from '@/components/TrialButton';

const fetchUserData = async (username: string) => {
  const data = await api.getUserInfo(username);
  return data;
};

const fetchSubscriptionsData = async () => {
  const data = await api.getAllSubscriptions();
  return data;
};

const Index = () => {
  const [userTelegramId, setUserTelegramId] = useState(null);
  const [userTelegramUsername, setUserTelegramUsername] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);

  const [paymentModalOpened, setPaymentModalOpened] = useState(false);

  const [trialActivationModalOpened, setTrialActivationModalOpened] = useState(false);

  const tg = window.Telegram.WebApp;

  useEffect(() => {
    if (tg.initDataUnsafe) {
      const userId = tg.initDataUnsafe?.user?.id;
      const userUsername = tg.initDataUnsafe?.user?.username;

      setUserTelegramId(userId);
      setUserTelegramUsername(userUsername);

      tg.ready();
    }
  }, [tg]);

  const { data: currentUserData, error: currentUserError, isLoading: currentUserDataIsLoading, refetch: refetchUserData } = useQuery({
    queryKey: ['user', userTelegramUsername],
    queryFn: () => fetchUserData(userTelegramUsername),
    enabled: !!userTelegramUsername
  })

  const { data: subsriptionsData, error: subsriptionsError, isLoading: subsriptionsDataIsLoading } = useQuery({
    queryKey: ['subsriptions'],
    queryFn: () => fetchSubscriptionsData(),
  })

  useEffect(() => {
    if (subsriptionsData) {
      setSubscriptions([
        { type: 'monthly', price: subsriptionsData?.find(item => item.days === 30).price, days: subsriptionsData?.find(item => item.days === 30).days, isPopular: false },
        { type: 'quarterly', price: subsriptionsData?.find(item => item.days === 90).price, days: subsriptionsData?.find(item => item.days === 90).days, isPopular: true },
        { type: 'yearly', price: subsriptionsData?.find(item => item.days === 365).price, days: subsriptionsData?.find(item => item.days === 365).days, isPopular: false }
      ]);
    }
  }, [subsriptionsData]);


  const [selectedPlan, setSelectedPlan] = useState<Subscription | null>(null);
  const [selectedTarifCard, setSelectedTarifCard] = useState<string | null>(null);

  const handleSelectPlan = (plan: Subscription) => {
    if (plan.type === selectedTarifCard) {
      setSelectedPlan(null);
      setSelectedTarifCard(null);
    } else {
      setSelectedPlan(plan);
      setSelectedTarifCard(plan.type);
      setPaymentModalOpened(true);
    }
  };

  // Format plan types in Russian for display
  // const getPlanLabel = (type: string) => {
  //   switch(type) {
  //     case 'monthly': return 'Месячный';
  //     case 'quarterly': return 'Квартальный';
  //     case 'yearly': return 'Годовой';
  //     default: return type;
  //   }
  // };

  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  }

  const daysUntil = (timestamp: number) => {
    const now = Date.now();
    const targetDate = timestamp * 1000; 
    const difference = targetDate - now;
    const daysRemaining = Math.round(difference / (1000 * 60 * 60 * 24));
  
    return daysRemaining >= 0 ? daysRemaining : 0;
  }

  const hoursUntil = (timestamp: number) => {
    const now = Date.now();
    const targetDate = timestamp * 1000; 
    const difference = targetDate - now;
    const hoursRemaining = Math.floor(difference / (1000 * 60 * 60));
  
    return hoursRemaining >= 0 ? hoursRemaining : 0;
  }

  const formatTimestampToDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);

    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}.${month}.${year}`;
  }

  const buySubscription = async (promocode?: string) => {
    if (promocode?.length > 0) {
      toast({
        title: "Введенный промокод не существует или уже был активирован",
      });
    }
    if (userTelegramId && userTelegramUsername) {
      const invoiceData = await api.initSubscriptionInvoice(userTelegramId, userTelegramUsername, selectedPlan.days, selectedPlan.price, promocode);
      
      if (invoiceData && invoiceData.result) {
        const tg = window.Telegram.WebApp;
        tg.openInvoice(invoiceData.result, (status: string) => {
          if (status === 'paid') {
            setSelectedPlan(null);
            setSelectedTarifCard(null);
            refetchUserData();
            scrollToTop();
          } else {
            if (status === 'failed') {
              toast({
                title: "Ошибка оплаты счета",
                description: `Не удалось подтвердить оплату счета`,
              });
            }
          }
        });
      } else {
        toast({
          title: "Ошибка Telegram API",
          description: "Не удалось создать счет на оплату подписки",
        });
      }
    } else {
      toast({
        title: "Ошибка Telegram",
        description: "Не удалось получить данные аккаунта",
      });
    }
  }

  const activateTrial = async () => {
    if (userTelegramId && userTelegramUsername) {
      const trialSubscriptionStatus = await api.initTrialSubscription(userTelegramId, userTelegramUsername);
      if (trialSubscriptionStatus === 201 || trialSubscriptionStatus === 200) {
        setTrialActivationModalOpened(false);
        refetchUserData();
        scrollToTop();
      } else {
        toast({
          title: "Ошибка активации",
          description: `Не удалось активировать пробный период`,
        });
      }
    } else {
      toast({
        title: "Ошибка Telegram",
        description: "Не удалось получить данные аккаунта",
      });
    }
  }

  const handleSelectTrial = () => {
    setTrialActivationModalOpened(true);
  }

  const handleCloseModal = () => {
    setPaymentModalOpened(false);
  }

  const handleCloseTrialModal = () => {
    setTrialActivationModalOpened(false);
  } 

  return (
    <div className="min-h-screen bg-telegram-bg flex flex-col">
      
      <ScrollArea className="flex-1 pb-2 scrollbar-none">
        <div className="container max-w-md mx-auto px-4 pb-6 pt-5">

        <Header />
          
          <AccountInfo 
            username={userTelegramUsername} 
            expiryDate={currentUserData ? formatTimestampToDate(currentUserData?.expire) : null} 
            isActive={currentUserData?.status === "active"} 
          />
          
          {(currentUserData && currentUserData.status === "active") && (
            <UserStats usedTraffic={currentUserData.used_traffic} dataLimit={currentUserData.data_limit} onlineAt={currentUserData.online_at} 
              expireDays={daysUntil(currentUserData.expire)} expireHours={hoursUntil(currentUserData.expire)} isActive={currentUserData.status === "active"} />
          )}

          {(currentUserData && currentUserData.status === "active") && <ConnectionMethods links={currentUserData.links} />}

          {(!currentUserData) ? (
            <>
              <h3 className="font-bold text-lg mb-1">Пробный период</h3>
              <p className="text-sm text-gray-400 mb-3">
                Получите конфиг VLESS совершенно бесплатно и лично убедитесь во всех наших преимуществах.
              </p>
              <SubscriptionCard
                key={'trial'}
                isSelected={selectedTarifCard === 'trial'}
                type={'trial'}
                price={0}
                isPopular={false}
                onClick={() => handleSelectTrial()}
              />
            </>
          ) : null}

          {(currentUserData && currentUserData.status) ? (
            <>
              <h3 className="font-bold text-lg mb-1">Продлить подписку</h3>
              <p className="text-sm text-gray-400 mb-3">
                Вы можете продлить её заранее, выбрав один из тарифов. Дни доступа добавятся к имеющимся.
              </p>
            </>
          ) : (
            <h3 className="font-bold text-lg mb-3 text-white">Выберите тариф</h3>
          )}

          {subscriptions && subscriptions?.map((sub: any) => (
            <SubscriptionCard
              key={sub.type}
              isSelected={selectedTarifCard === sub.type}
              type={sub.type}
              price={sub.price}
              isPopular={sub.isPopular}
              onClick={() => handleSelectPlan(sub)}
            />
          ))}

          <div className="mt-6">
            <PlanFeatures />
          </div>

          <SupportButton />

          <PremiumBotButton />
        </div>
      </ScrollArea>
      
      {selectedPlan && (
        <PaymentButton 
          price={selectedPlan.price}
          label={`Купить ${selectedPlan.days} дней доступа`}
          onClick={(promocode?: string) => buySubscription(promocode)}
          isOpened={paymentModalOpened}
          handleCloseModal={() => handleCloseModal()}
        />
      )}

      {(!currentUserData) ? (
        <TrialButton
          onClick={() => activateTrial()}
          isOpened={trialActivationModalOpened}
          handleCloseModal={() => handleCloseTrialModal()}
        />
      ) : null}

      <MetrikaCounter
        id={101316785}
        options={{
          webvisor: true,
          trackLinks:true,
          accurateTrackBounce:true,
          clickmap:true,
        }}
      />
    </div>
  );
};

export default Index;
