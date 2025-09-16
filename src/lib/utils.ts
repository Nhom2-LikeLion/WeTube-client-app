import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDuration = (duration: number) => {
  const totalSeconds = Math.floor(duration); // <-- bỏ /1000
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
};


export const snakeCaseToTitle = (str: string) => {
  return str
    .replace(/_/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
};

export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);

  const diff = now.getTime() - date.getTime(); // difference in ms
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);
  const months  = Math.floor(days / 30);
  const years   = Math.floor(days / 365);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24)   return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 30)    return `${days} day${days > 1 ? 's' : ''} ago`;
  if (months < 12)  return `${months} month${months > 1 ? 's' : ''} ago`;
  return `${years} year${years > 1 ? 's' : ''} ago`;
};

export const formatViews = (num?: number) => {
  if (!num) return "0 views";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M views";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K views";
  return num + " views";
};

export const generateId = () => crypto.randomUUID();
