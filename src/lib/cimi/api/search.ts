'use server';

type ServerActionResponse<T> = {
  error: string | null;
  result: T | null;
};

type ListingSearchItem = {
  id: number;
  title: string;
  coverImageUrl: string;
};

export async function searchListings(): Promise<
  ServerActionResponse<ListingSearchItem[]>
> {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/search`, {
      method: 'GET',
    });

    if (!res.ok) {
      return { error: 'There was an error.', result: null };
    }

    const data: ListingSearchItem[] = await res.json();
    return { error: null, result: data };
  } catch (e) {
    console.error(e);
    return { error: 'There was an error', result: null };
  }
}
