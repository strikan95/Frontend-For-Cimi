import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAddress(selection: MapboxGeocoder.Result): {
  street: string;
  streetNumber: string;
  postCode: string;
  city: string;
  country: string;
  longitude: number;
  latitude: number;
} {
  return {
    street: selection.text || '',
    streetNumber: selection.address || '',
    postCode:
      selection.context
        ?.filter((value: { id: string; text: string }) =>
          value.id.includes('postcode')
        )
        .pop()?.text || '',
    city:
      selection.context
        ?.filter((value: { id: string; text: string }) =>
          value.id.includes('place')
        )
        .pop()?.text || '',
    country:
      selection.context
        ?.filter((value: { id: string; text: string }) =>
          value.id.includes('country')
        )
        .pop()?.text || '',
    longitude: selection.geometry.coordinates[0],
    latitude: selection.geometry.coordinates[1],
  };
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function rangeToDateArray(startDate: Date, endDate: Date): Date[] {
  let currentDate = new Date(startDate);
  let dates = [];
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}
