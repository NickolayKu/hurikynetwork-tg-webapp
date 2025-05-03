/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@/hooks/use-toast';
import { api } from './api';

class SubscriptionsService {
  async buySubscription(userTelegramId: string, userTelegramUsername: string, selectedPlan: any, promocode?: string): Promise<boolean> {  
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
            return true;
          } else {
            if (status === 'failed') {
              toast({
                title: "Ошибка оплаты счета",
                description: `Не удалось подтвердить оплату счета`,
              });
            }
            return false;
          }
        });
      } else {
        toast({
          title: "Ошибка Telegram API",
          description: "Не удалось создать счет на оплату подписки",
        });
        return false;
      }
    } else {
      toast({
        title: "Ошибка Telegram",
        description: "Не удалось получить данные аккаунта",
      });
      return false;
    }
  }

  async buyResetSubscriptionTraffic(userTelegramId: string, userTelegramUsername: string): Promise<boolean> {  
    if (userTelegramUsername) {
      const invoiceData = await api.initResetSubscriptionTrafficInvoice(userTelegramId, userTelegramUsername);
      
      if (invoiceData && invoiceData.result) {
        const tg = window.Telegram.WebApp;
        tg.openInvoice(invoiceData.result, (status: string) => {
          if (status === 'paid') {
            return true;
          } else {
            if (status === 'failed') {
              toast({
                title: "Ошибка оплаты счета",
                description: `Не удалось подтвердить оплату счета`,
              });
            }
            return false;
          }
        });
      } else {
        toast({
          title: "Ошибка Telegram API",
          description: "Не удалось создать счет на оплату сброса трафика",
        });
        return false;
      }
    } else {
      toast({
        title: "Ошибка Telegram",
        description: "Не удалось получить данные аккаунта",
      });
      return false;
    }
  }

  async activateTrial(userTelegramId: string, userTelegramUsername: string): Promise<boolean> {
    if (userTelegramId && userTelegramUsername) {
      const trialSubscriptionStatus = await api.initTrialSubscription(userTelegramId, userTelegramUsername);
      if (trialSubscriptionStatus === 201 || trialSubscriptionStatus === 200) {
        return true;
      } else {
        toast({
          title: "Ошибка активации",
          description: `Не удалось активировать пробный период`,
        });
        return false;
      }
    } else {
      toast({
        title: "Ошибка Telegram",
        description: "Не удалось получить данные аккаунта",
      });
      return false;
    }
  }
}

export const subscriptionsService = new SubscriptionsService();