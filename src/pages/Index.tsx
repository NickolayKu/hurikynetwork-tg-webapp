/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '@/components/Header';
import SubscriptionCard from '@/components/SubscriptionCard';
import AccountInfo from '@/components/AccountInfo';
import UserStats from '@/components/UserStats';
import ConnectionMethods from '@/components/ConnectionMethods';
import { Subscription } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import SupportButton from '@/components/SupportButton';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from '@/services/api';
import { useEffect, useState } from "react";
import PremiumBotButton from '@/components/PremiumBotButton';
import { MetrikaCounter } from 'react-metrika';
import { daysUntil, formatTimestampToDate, hoursUntil, isTrafficUpdateAvailable } from '@/lib/utils';
import { subscriptionsService } from '@/services/subscriptions.service';
import LoadingScreen from '@/components/LoadingScreen';
import UpdateTrafficButton from '@/components/UpdateTrafficButton';

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

  const [isLoadingScreenShowing, setIsLoadingScreenShowing] = useState(false);

  const [userTrafficUsage, setUserTrafficUsage] = useState(0);

  const tg = window.Telegram.WebApp;

  useEffect(() => {
    if (tg.initDataUnsafe) {
      const userId = tg.initDataUnsafe?.user?.id;
      const userUsername = tg.initDataUnsafe?.user?.username;

      if (!userUsername) {
        if (userId) setUserTelegramUsername(userId);
      } else {
        setUserTelegramUsername(userUsername);
      }
      setUserTelegramId(userId);

      tg.ready();
    }
  }, [tg]);

  const { data: currentUserData, error: currentUserError, isLoading: currentUserDataIsLoading, refetch: refetchUserData } = useQuery({
    queryKey: ['current_user'],
    queryFn: () => fetchUserData(userTelegramUsername),
    enabled: !!userTelegramUsername
  })

  const { data: subsriptionsData, error: subsriptionsError, isLoading: subsriptionsDataIsLoading } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => fetchSubscriptionsData(),
  })

  useEffect(() => {
    if (subsriptionsData) {
      setSubscriptions([
        { type: 'monthly', price: subsriptionsData?.find(item => item.days === 30).price, days: subsriptionsData?.find(item => item.days === 30).days, isPopular: false },
        { type: 'quarterly', price: subsriptionsData?.find(item => item.days === 90).price, days: subsriptionsData?.find(item => item.days === 90).days, isPopular: true },
        // { type: 'yearly', price: subsriptionsData?.find(item => item.days === 365).price, days: subsriptionsData?.find(item => item.days === 365).days, isPopular: false }
      ]);
    }
  }, [subsriptionsData]);

  useEffect(() => {
    if (currentUserData) {
      setUserTrafficUsage(currentUserData.used_traffic);
    }
  }, [currentUserData])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const handleSelectSubscriptionPlan = async (subscription: Subscription) => {
    if (!isLoadingScreenShowing) {
      setIsLoadingScreenShowing(true);
      const userSubscriptionResult = await subscriptionsService.buySubscription(userTelegramId, userTelegramUsername, subscription);
  
      if (userSubscriptionResult) {
        setTimeout(() => {
          refetchUserData();
        }, 200)
        setIsLoadingScreenShowing(false);
        scrollToTop();
      } else {
        setIsLoadingScreenShowing(false);
      }
    }
  }

  const handleBuyResetSubscriptionTraffic = async () => {
    if (!isLoadingScreenShowing) {
      setIsLoadingScreenShowing(true);
      const userResetSubscriptionTrafficResult = await subscriptionsService.buyResetSubscriptionTraffic(userTelegramId, userTelegramUsername);

      if (userResetSubscriptionTrafficResult) {
        setUserTrafficUsage(0);
        setIsLoadingScreenShowing(false);
        scrollToTop();
      } else {
        setIsLoadingScreenShowing(false);
      }
    }
  }

  return (
    <div className="min-h-screen bg-telegram-bg flex flex-col">
      
      <ScrollArea className="flex-1 pb-2 scrollbar-none">
        <div className="container max-w-md mx-auto px-4 pb-6 pt-5">

        <Header />
          
          <AccountInfo 
            username={userTelegramUsername} 
            expiryDate={currentUserData ? formatTimestampToDate(currentUserData?.expire) : null} 
            usedTraffic={userTrafficUsage} dataLimit={currentUserData?.data_limit}
            isActive={currentUserData?.status === "active"} 
          />
          
          {(currentUserData && currentUserData.status === "active") && (
            <UserStats usedTraffic={userTrafficUsage} dataLimit={currentUserData.data_limit} onlineAt={currentUserData.online_at} 
              expireDays={daysUntil(currentUserData.expire)} expireHours={hoursUntil(currentUserData.expire)} isActive={currentUserData.status === "active"} />
          )}

          {(currentUserData && isTrafficUpdateAvailable(currentUserData.used_traffic)) && (
            <UpdateTrafficButton handleBuyResetTraffic={() => handleBuyResetSubscriptionTraffic()} />
          )}

          {currentUserData && (
            <>
              <h3 className="font-bold text-lg mb-1">Продлить подписку</h3>
              <p className="text-sm text-gray-400 mb-3">
                Вы можете продлить её заранее, выбрав один из тарифов. Дни доступа добавятся к имеющимся.
              </p>
            </>
          )}

          {subscriptions && subscriptions?.map((sub: any) => (
            <SubscriptionCard
              key={sub.type}
              isSelected={false}
              type={sub.type}
              price={sub.price}
              isPopular={sub.isPopular}
              onClick={() => handleSelectSubscriptionPlan(sub)}
            />
          ))}

          {currentUserData && <ConnectionMethods links={currentUserData?.links} />}

          <PremiumBotButton />

          <SupportButton />

        </div>
      </ScrollArea>

      <LoadingScreen isShowing={isLoadingScreenShowing} />

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
