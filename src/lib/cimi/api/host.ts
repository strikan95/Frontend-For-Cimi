'use server';
import { ServerActionResponse } from '@/types/serverAction.types';
import { Listing } from '@/lib/cimi/types/listingData.types';
import { getSession } from '@auth0/nextjs-auth0';

async function getListings(
  id: string | 'me'
): Promise<ServerActionResponse<Listing[]>> {
  const session = await getSession();

  try {
    const res = await fetch(
      `http://localhost:8080/api/v1/hosts/${id}/listings`,
      {
        method: 'GET',
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        cache: 'no-cache',
      }
    );

    if (!res.ok) {
      return { error: 'There was an error', result: null };
    }

    const data: Listing[] = await res.json();

    return { error: null, result: data };
  } catch (e) {
    console.error(e);
    return { error: 'There was an error', result: null };
  }
}

export async function getCurrentHostListings(): Promise<
  ServerActionResponse<Listing[]>
> {
  return getListings('me');
}

export async function addRentPeriod(
  data: unknown,
  id: string
): Promise<ServerActionResponse<string>> {
  const session = await getSession();
  console.log(id);
  try {
    const res = await fetch(
      `http://localhost:8080/api/v1/listings/${id}/occupancy`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        cache: 'no-cache',
      }
    );

    if (!res.ok) {
      //console.log(res);
      return { error: 'There was an error', result: null };
    }

    return { error: null, result: 'Success' };
  } catch (e) {
    console.error(e);
    return { error: 'There was an error', result: null };
  }
}

export async function startWizardProcess(): Promise<
  ServerActionResponse<number>
> {
  const session = await getSession();

  try {
    const res = await fetch(`http://localhost:8080/api/v1/draft`, {
      method: 'POST',
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      return { error: 'There was an error', result: null };
    }

    const data: Listing = await res.json();

    return { error: null, result: data.id };
  } catch (e) {
    console.error(e);
    return { error: 'There was an error', result: null };
  }
}

export async function getHostListings(
  id: string
): Promise<ServerActionResponse<Listing[]>> {
  return getListings(id);
}
