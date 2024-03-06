'use server';

import { Listing } from '@/lib/cimi/types/listingData.types';
import { ServerActionResponse } from '@/types/serverAction.types';

export async function getListing(
  id: string
): Promise<ServerActionResponse<Listing>> {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/listings/${id}`, {
      method: 'GET',
    });

    if (!res.ok) {
      return { error: 'There was an error', result: null };
    }

    const data: Listing = await res.json();

    return { error: null, result: data };
  } catch (e) {
    console.error(e);
    return { error: 'There was an error', result: null };
  }
}
