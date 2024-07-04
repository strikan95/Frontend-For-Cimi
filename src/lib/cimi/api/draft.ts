'use server';

import { Draft, DraftImage } from '@/lib/cimi/types/draftData.types';
import {
  Amenity,
  Listing,
  StructureType,
} from '@/lib/cimi/types/listingData.types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';

type ServerActionResponse<T> = {
  error: string | null;
  result: T | null;
};

export async function getAmenities(): Promise<ServerActionResponse<Amenity[]>> {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/amenities`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'force-cache',
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
    const res = await fetch(`http://localhost:8080/api/v1/structure-types`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'force-cache',
    });

    if (!res.ok) {
      return { error: 'Ops, something went wrong.', result: null };
    }

    const data = await res.json();
    return { error: null, result: [...data.structureTypes] };
  } catch (e) {
    console.error(e);
    return { error: 'Ops, something went wrong.', result: null };
  }
}

export async function startWizardProcess(): Promise<
  ServerActionResponse<number>
> {
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`http://localhost:8080/api/v1/draft`, {
      method: 'POST',
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${session?.token}`,
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

export async function getDraft(
  id: string
): Promise<ServerActionResponse<Draft>> {
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`http://localhost:8080/api/v1/draft/${id}`, {
      method: 'GET',
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${session?.token}`,
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
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(
      `http://localhost:8080/api/v1/draft/${id}/${step}`,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer ${session?.token}`,
        },
        cache: 'no-cache',
      }
    );

    if (!res.ok) {
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
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`http://localhost:8080/api/v1/draft/${id}/image`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
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
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`http://localhost:8080/api/v1/draft/${id}/image`, {
      method: 'POST',
      body: data,
      headers: {
        ContentType: 'multipart/form',
        Authorization: `Bearer ${session?.token}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
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
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(
      `http://localhost:8080/api/v1/draft/${id}/image/${imgId}`,
      {
        method: 'DELETE',
        body: null,
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer ${session?.token}`,
        },
        cache: 'no-cache',
      }
    );

    if (!res.ok) {
      return { error: 'Ops, something went wrong.', result: null };
    }

    return { error: null, result: await res.json() };
  } catch (e) {
    console.error(e);
    return { error: 'Network Error: Failed to fetch draft data', result: null };
  }
}
