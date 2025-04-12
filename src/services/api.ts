import axios, { AxiosInstance } from "axios";

class Api {
  private baseUrl: string;
  private api: AxiosInstance;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    this.api = axios.create({
      baseURL: this.baseUrl,
    });
  }

  async getAllSubscriptions() {
    try {
      const { data } = await this.api.get(`/subscriptions`);
      return data;
    } catch(error){
      return error;
    }
  }

  async getUserInfo(username: string) {
    try {
      const { data } = await this.api.get(`users/${username}`);
      return data;
    } catch(error){
      return error;
    }
  }

  async initSubscriptionInvoice(telegramUserId: string, telegramUsername: string, days: number, price: number) {
    try {
      const { data } = await this.api.post(`/subscriptions/invoice`, {
        telegramUserId: telegramUserId,
        username: telegramUsername,
        order: {
          days: days,
          price: price,
        }
      });
      return data;
    } catch(error){
      return error;
    }
  }
}

export const api = new Api();