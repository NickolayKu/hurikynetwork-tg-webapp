import { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { api } from '@/services/api';

const fetchUserData = async (username: string) => {
  const data = await api.getUserInfo(username);
  return data;
};

const Init = () => {
  const navigate = useNavigate();

  const [telegramUsername, setTelegramUsername] = useState(null);
  const [isActivePage, setIsActivePage] = useState(false);

  const { data: currentUserData, isFetched: currentUserDataIsFetched } = useQuery({
    queryKey: ['current_user'],
    queryFn: () => fetchUserData(telegramUsername),
    enabled: telegramUsername !== null
  })

  const tg = window.Telegram.WebApp;

  useEffect(() => {
    setIsActivePage(true);
  }, []);
  
  useEffect(() => {
    if (tg) {
      const userUsername = tg.initDataUnsafe?.user?.username;
      //const userUsername = 'ni_cko_lay123123';
  
      if (userUsername) {
        setTelegramUsername(userUsername);
      }

      tg.ready();
    }
  }, [tg]);

  useEffect(() => {
    if (currentUserDataIsFetched) {
      setIsActivePage(false);

      const currentUrl = window.location.href;
      const telegramUrlParams = currentUrl.substring(currentUrl.indexOf(window.location.origin) + window.location.origin.length);

      if (currentUserData) {
        navigate(`/home${telegramUrlParams}`);
      } else {
        navigate(`/start${telegramUrlParams}`);
      }
    }
  }, [currentUserData, currentUserDataIsFetched]);

  return (
    <div className={`start-page-screen min-h-screen flex fixed top-0 left-0 right-0 px-5 flex-col items-center justify-center text-center w-full ${isActivePage ? 'active' : ''}`}>
      <div className="flex items-center">
        <div className="w-12 h-12 flex items-center justify-center">
          <Zap className="w-12 h-12 text-huriky-yellow animate-lightning-flash" />
        </div>
      </div>
    </div>
  );
};

export default Init;