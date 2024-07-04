import { delay } from '@/lib/utils';

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

type ListingSearchResponseData = {
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
  amenities: string[];
};

export async function searchListings(
  params: Partial<QueryParams>
): Promise<ServerActionResponse<ListingSearchResponseData>> {
  await delay(5000);
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

    if (params.page) {
      paramList += '&page=' + params.page;
    }

    if (params.amenities && params.amenities.length > 0) {
      if (Array.isArray(params.amenities)) {
        for (const param in params.amenities) {
          paramList +=
            '&amenities[]=' +
            encodeURIComponent(params.amenities[param] as string);
        }
      } else {
        paramList +=
          '&amenities[]=' + encodeURIComponent(params.amenities as string);
      }
    }

    const res = await fetch(
      `http://localhost:8080/api/v1/search?` + paramList,
      {
        method: 'GET',
        cache: 'no-cache',
      }
    );

    if (!res.ok) {
      return { error: 'There was an error. ' + res.status, result: null };
    }

    const data: ListingSearchResponseData = await res.json();
    return { error: null, result: data };
  } catch (e) {
    console.error(e);
    return { error: 'There was an error', result: null };
  }
}
