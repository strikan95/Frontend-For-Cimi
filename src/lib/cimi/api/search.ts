'use server';

import exp from 'node:constants';
import { Listing } from '@/lib/cimi/types/listingData.types';

type ServerActionResponse<T> = {
  error: string | null;
  result: T | null;
};

export type ListingSearchItem = {
  id: number;
  title: string;
  coverImageUrl: string;
  price: number;
  location: {
    country: string;
    city: string;
  };
};

export type ListingSearchResponseData = {
  listings: { listing: ListingSearchItem; distance: number }[];
  pages: number;
};

export type QueryParams = {
  poi: string;
  priceMax: string;
  priceMin: string;
  from: string;
  to: string;
  page: number;
};

export async function searchListings(
  params: Partial<QueryParams>,
  page: 0 | number
): Promise<ServerActionResponse<ListingSearchResponseData>> {
  try {
    let paramList = `poi=${params.poi}`;

    if (params.priceMax) {
      paramList += '&priceMax=' + params.priceMax;
    }

    if (params.priceMin) {
      paramList += '&priceMin=' + params.priceMin;
    }

    if (params.from) {
      paramList += '&from=' + params.from;
    }

    if (params.to) {
      paramList += '&to=' + params.to;
    }

    if (page) {
      paramList += '&page=' + page;
    }

    const res = await fetch(
      `http://localhost:8080/api/v1/search?` + paramList,
      {
        method: 'GET',
        cache: 'no-cache',
      }
    );

    if (!res.ok) {
      return { error: 'There was an error.', result: null };
    }

    const data: ListingSearchResponseData = await res.json();

    return { error: null, result: data };
  } catch (e) {
    console.error(e);
    return { error: 'There was an error', result: null };
  }
}
