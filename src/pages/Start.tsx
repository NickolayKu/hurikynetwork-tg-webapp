/* eslint-disable @typescript-eslint/no-explicit-any */
import { Subscription } from '@/types';
import { useQuery } from "@tanstack/react-query";
import { api } from '@/services/api';
import { useEffect, useState } from "react";
import { MetrikaCounter } from 'react-metrika';
import StartScreen from '@/components/StartScreen';
import DeviceScreen from '@/components/DeviceScreen';
import SubscriptionScreen from '@/components/SubscriptionScreen';
import InstallAppScreen from '@/components/InstallAppScreen';
import ConfigScreen from '@/components/ConfigScreen';
import { subscriptionsService } from '@/services/subscriptions.service';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';

const fetchSubscriptionsData = async () => {
  const data = await api.getAllSubscriptions();
  return data;
};

const fetchUserData = async (username: string) => {
  const data = await api.getUserInfo(username);
  return data;
};

const Start = () => {
  const navigate = useNavigate();
  
  const [userTelegramId, setUserTelegramId] = useState(null);
  const [userTelegramUsername, setUserTelegramUsername] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);

  const [userHaveSubscription, setUserHaveSubscription] = useState(false);
  const [isLoadingScreenShowing, setIsLoadingScreenShowing] = useState(false);

  const tg = window.Telegram.WebApp;

  useEffect(() => {
    if (tg.initDataUnsafe) {
      const userId = tg.initDataUnsafe?.user?.id;
      const userUsername = tg.initDataUnsafe?.user?.username;

      if (!userUsername) {
        setUserTelegramUsername(userId);
      } else {
        setUserTelegramUsername(userUsername);
      }
      setUserTelegramId(userId);

      tg.ready();
    }
  }, [tg]);

  const { data: subsriptionsData, error: subsriptionsError, isLoading: subsriptionsDataIsLoading } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => fetchSubscriptionsData(),
  })

  const { data: currentUserData, error: currentUserError, isLoading: currentUserDataIsLoading, isFetched: currentUserDataIsFetched } = useQuery({
    queryKey: ['current_user'],
    queryFn: () => fetchUserData(userTelegramUsername),
    enabled: !!userHaveSubscription
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

  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setSelectedScreen('start');
    }, 100)
  }, [])

  const changeScreenAnimation = (screen: string) => {
    setSelectedScreen(null);
    setTimeout(() => {
      setSelectedScreen(screen);
    }, 100)
  }

  const handleClickNextScreen = (): any => {
    if (selectedScreen === 'start') {   
      changeScreenAnimation('device');
    }
    if (selectedScreen === 'installapp') {
      changeScreenAnimation('subscription');
    }
    if (selectedScreen === 'config') {
      const currentUrl = window.location.href;
      const baseUrl = `${window.location.origin}/start`;
      const telegramUrlParams = currentUrl.substring(currentUrl.indexOf(baseUrl) + baseUrl.length);

      navigate(`/home${telegramUrlParams}`);
    }
  }

  const handleSelectDevice = (device: string) => {
    setSelectedDevice(device);
    changeScreenAnimation('installapp');
  }

  const handleSelectSubscriptionPlan = async (subscription: any) => {
    if (!isLoadingScreenShowing) {
      setIsLoadingScreenShowing(true);
      const userSubscriptionResult = subscription === 'trial' ? await subscriptionsService.activateTrial(userTelegramId, userTelegramUsername) : 
        await subscriptionsService.buySubscription(userTelegramId, userTelegramUsername, subscription);

      if (userSubscriptionResult) {
        setUserHaveSubscription(true);    
        setIsLoadingScreenShowing(false);
        changeScreenAnimation('config');
      } else {
        setIsLoadingScreenShowing(false);
      }
    }
  }

  const handleClickPrevScreen = () => {
    if (selectedScreen === 'installapp') {
      changeScreenAnimation('device');
    }
    if (selectedScreen === 'subscription') {
      changeScreenAnimation('installapp');
    }
  }

  return (
    <div className="h-full bg-telegram-bg flex flex-col scrollbar-none">
      <div className="w-full max-h-screen overflow-hidden mx-auto px-6">
          
        <StartScreen isActive={selectedScreen === 'start'} handleClickNextScreen={() => handleClickNextScreen()} />
        <DeviceScreen isActive={selectedScreen === 'device'} handleClickNextScreen={(device: string) => handleSelectDevice(device)} />
        <InstallAppScreen isActive={selectedScreen === 'installapp'} handleClickNextScreen={() => handleClickNextScreen()} 
          selectedDevice={selectedDevice} handleClickPrevScreen={() => handleClickPrevScreen()} />
        <SubscriptionScreen isActive={selectedScreen === 'subscription'} handleClickNextScreen={(subscription: any) => handleSelectSubscriptionPlan(subscription)} 
          subscriptions={subscriptions} handleClickPrevScreen={() => handleClickPrevScreen()} />
        <ConfigScreen isActive={selectedScreen === 'config'} links={currentUserData ? currentUserData.links : ['']} 
          handleClickNextScreen={() => handleClickNextScreen()} />

      </div>

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

export default Start;
