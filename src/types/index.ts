
export interface Subscription {
  type: 'monthly' | 'quarterly' | 'yearly';
  price: number;
  isPopular?: boolean;
}

export interface User {
  username: string;
  isActive: boolean;
  expiryDate?: string;
}
