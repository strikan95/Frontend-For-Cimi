import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToDDMMYY(date?: Date) {
  if (!date) {
    return '';
  }

  // Get the day, month, and year
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1
  const year = date.getFullYear() % 100; // Get the last two digits of the year

  // Pad the day and month with leading zeros if needed
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;

  // Format the date string
  return `${formattedDay}/${formattedMonth}/${year}`;
}
