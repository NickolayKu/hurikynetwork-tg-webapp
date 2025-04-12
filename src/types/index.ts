/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Subscription {
  type: 'monthly' | 'quarterly' | 'yearly';
  price: number;
  isPopular?: boolean;
}

export interface User {
  username: string;
  isActive: boolean;
  expiryDate?: string;
  statistics?: UserStatistics;
}

export interface UserStatistics {
  daysLeft: number;
  dataUsed: string;
  dataLimit: string;
  uptime: string;
  lastConnection?: string;
}

export interface ConnectionMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface TelegramWebApp {
  initDataUnsafe: {
      user: any;
      [key: string]: any;
  };
}

export interface Window {
  Telegram: {
      WebApp: TelegramWebApp;
  };
}