'use server';

import { getSession } from '@auth0/nextjs-auth0';
import { Draft, StructureType, StructureTypes } from '@/types/draftData.types';

type ServerActionResponse<T> = {
  error: string | null;
  result: T | null;
};

export async function getStructureTypes(): Promise<
  ServerActionResponse<StructureType[]>
> {
  try {
    const res = await fetch(
      `http://localhost:8080/api/v1/options/structure_type?${Math.random()}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-cache',
      }
    );

    if (!res.ok) {
      return { error: 'Ops, something went wrong.', result: null };
    }

    const data: StructureTypes = await res.json();
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
    const res = await fetch(
      `http://localhost:8080/api/v1/create-a-listing/${id}`,
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
  data: Partial<Draft>,
  id: string,
  step: string
): Promise<ServerActionResponse<Draft>> {
  const session = await getSession();

  try {
    const res = await fetch(
      `http://localhost:8080/api/v1/create-a-listing/${id}/${step}`,
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
      return { error: 'Ops, something went wrong.', result: null };
    }

    return { error: null, result: null };
  } catch (e) {
    console.error(e);
    return { error: 'Network Error: Failed to fetch draft data', result: null };
  }
}
