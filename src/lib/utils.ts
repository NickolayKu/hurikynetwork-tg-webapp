import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
}

export function daysUntil(timestamp: number): number {
  const now = Date.now();
  const targetDate = timestamp * 1000; 
  const difference = targetDate - now;
  const daysRemaining = Math.round(difference / (1000 * 60 * 60 * 24));

  return daysRemaining >= 0 ? daysRemaining : 0;
}

export function hoursUntil(timestamp: number): number {
  const now = Date.now();
  const targetDate = timestamp * 1000; 
  const difference = targetDate - now;
  const hoursRemaining = Math.floor(difference / (1000 * 60 * 60));

  return hoursRemaining >= 0 ? hoursRemaining : 0;
}

export function formatTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}.${month}.${year}`;
}

export function isTrafficUpdateAvailable(usedTraffic: number): boolean {
  const usedTrafficInGb = (usedTraffic / (1024 ** 3)).toFixed(0);
  const trafficForAvailablity = import.meta.env.VITE_UPDATE_TRAFFIC_AVAILABLE_AFTER_GB || 100;

  if (usedTrafficInGb >= trafficForAvailablity) {
    return true;
  } else {
    return false;
  }
}