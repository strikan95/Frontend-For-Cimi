'use server';

import { getSession } from '@auth0/nextjs-auth0';
import {
  Draft,
  DraftAmenity,
  DraftImage,
} from '@/lib/cimi/types/draftData.types';
import { Amenity, StructureType } from '@/lib/cimi/types/listingData.types';

type ServerActionResponse<T> = {
  error: string | null;
  result: T | null;
};

export async function getAmenities(): Promise<ServerActionResponse<Amenity[]>> {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/amenities`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    });

    if (!res.ok) {
      return { error: 'Ops, something went wrong.', result: null };
    }

    const data = await res.json();
    return { error: null, result: [...data.amenities] };
  } catch (e) {
    console.error(e);
    return { error: 'Ops, something went wrong.', result: null };
  }
}

export async function getStructureTypes(): Promise<
  ServerActionResponse<StructureType[]>
> {
  try {
    const res = await fetch(
      `http://localhost:8080/api/v1/options/structure_type`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-cache',
      }
    );

    if (!res.ok) {
      return { error: 'Ops, something went wrong.', result: null };
    }

    const data = await res.json();
    return { error: null, result: [...data.options] };
  } catch (e) {
    console.error(e);
    return { error: 'Ops, something went wrong.', result: null };
  }
}

export async function getDraft(
  id: string
): Promise<ServerActionResponse<Draft>> {
  const session = await getSession();

  try {
    const res = await fetch(`http://localhost:8080/api/v1/draft/${id}`, {
      method: 'GET',
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      return { error: 'Ops, something went wrong.', result: null };
    }

    const data: Draft = await res.json();

    return { error: null, result: data };
  } catch (e) {
    console.error(e);
    return { error: 'Network Error: Failed to fetch draft data', result: null };
  }
}

export async function updateDraft(
  data: unknown,
  id: string,
  step: string
): Promise<ServerActionResponse<Draft>> {
  const session = await getSession();

  try {
    const res = await fetch(
      `http://localhost:8080/api/v1/draft/${id}/${step}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        cache: 'no-cache',
      }
    );

    if (!res.ok) {
      console.log(await res.json());
      return { error: 'Ops, something went wrong.', result: null };
    }

    return { error: null, result: await res.json() };
  } catch (e) {
    console.error(e);
    return { error: 'Network Error: Failed to fetch draft data', result: null };
  }
}

export async function getDraftImages(
  id: string
): Promise<ServerActionResponse<DraftImage[]>> {
  const session = await getSession();

  try {
    const res = await fetch(`http://localhost:8080/api/v1/draft/${id}/image`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      console.log(await res.json());
      return { error: 'Ops, something went wrong.', result: null };
    }

    return { error: null, result: await res.json() };
  } catch (e) {
    console.error(e);
    return { error: 'Network Error: Failed to fetch draft data', result: null };
  }
}

export async function addDraftImage(
  data: FormData,
  id: string
): Promise<ServerActionResponse<{ message: string }>> {
  const session = await getSession();

  try {
    const res = await fetch(`http://localhost:8080/api/v1/draft/${id}/image`, {
      method: 'POST',
      body: data,
      headers: {
        ContentType: 'multipart/form',
        Authorization: `Bearer ${session?.accessToken}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      console.log(await res.json());
      return { error: 'Ops, something went wrong.', result: null };
    }

    return { error: null, result: await res.json() };
  } catch (e) {
    console.error(e);
    return { error: 'Network Error: Failed to fetch draft data', result: null };
  }
}

export async function removeDraftImage(
  id: string,
  imgId: string
): Promise<ServerActionResponse<Draft>> {
  const session = await getSession();

  try {
    const res = await fetch(
      `http://localhost:8080/api/v1/draft/${id}/image/${imgId}`,
      {
        method: 'DELETE',
        body: null,
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        cache: 'no-cache',
      }
    );

    if (!res.ok) {
      console.log(await res.json());
      return { error: 'Ops, something went wrong.', result: null };
    }

    return { error: null, result: await res.json() };
  } catch (e) {
    console.error(e);
    return { error: 'Network Error: Failed to fetch draft data', result: null };
  }
}

export async function loadTest(): Promise<ServerActionResponse<string[]>> {
  return { error: null, result: ['1', '2', '3', '4'] };
}
