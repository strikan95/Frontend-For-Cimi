'use server';

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
  listing: ListingSearchItem;
  distance: number;
};

export type QueryParams = {
  poi: string;
};

export async function searchListings(
  params: Partial<QueryParams>
): Promise<ServerActionResponse<ListingSearchResponseData[]>> {
  try {
    const res = await fetch(
      `http://localhost:8080/api/v1/search?poi=${params.poi}`,
      {
        method: 'GET',
      }
    );

    if (!res.ok) {
      return { error: 'There was an error.', result: null };
    }

    const data: ListingSearchResponseData[] = await res.json();
    return { error: null, result: data };
  } catch (e) {
    console.error(e);
    return { error: 'There was an error', result: null };
  }
}
