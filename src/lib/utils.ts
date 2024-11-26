import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDaysLeftUntilTargetDay(date: Date, targetDay: number) {
  const createdDate = new Date(date);
  const now = Date.now();
  const elapsedMilliseconds = now - createdDate.getTime();
  const elapsedDays = Math.floor(elapsedMilliseconds / (1000 * 60 * 60 * 24));
  const remainingDays = targetDay - elapsedDays;
  return remainingDays >= 0 ? remainingDays : 0;
}

export function checkCurrentDay(createdAt: Date, dayId: number) {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const differenceInMs = now.getTime() - createdDate.getTime();
  const currentDay = Math.floor(differenceInMs / (1000 * 60 * 60 * 24)) + 1;
  return currentDay === dayId;
}
