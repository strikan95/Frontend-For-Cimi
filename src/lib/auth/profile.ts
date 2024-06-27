'use server';

import { ServerActionResponse } from '@/types/serverAction.types';
import { ApiProfile } from '@/lib/cimi/types/profile.types';
import { getSession } from '@auth0/nextjs-auth0';

export async function updateUserProfileImage(
  data: FormData
): Promise<ServerActionResponse<{ message: string }>> {
  const session = await getSession();

  try {
    const res = await fetch(`http://localhost:8080/api/v1/users/me/image`, {
      method: 'POST',
      body: data,
      headers: {
        ContentType: 'multipart/form',
        Authorization: `Bearer ${session?.accessToken}`,
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

export async function finishUserProfile(
  data: unknown
): Promise<ServerActionResponse<ApiProfile>> {
  const route = '/api/v1/users/me/profile';
  const session = await getSession();

  if (!session) {
    return { error: 'Missing access token', result: null };
  }

  try {
    const res = await fetch(`http://localhost:8080${route}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      return { error: 'There was an error', result: null };
    }

    const json: ApiProfile = await res.json();

    return { error: null, result: json };
  } catch (e) {
    console.error(e);
    return { error: 'There was an error', result: null };
  }
}

export const getUserProfileData = async (): Promise<
  ServerActionResponse<ApiProfile>
> => {
  const session = await getSession();

  if (!session) {
    return { error: 'Missing access token', result: null };
  }

  try {
    const res = await fetch(`http://localhost:8080/api/v1/users/me`, {
      method: 'GET',
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      return { error: 'There was an error', result: null };
    }

    const data: ApiProfile = await res.json();

    return { error: null, result: data };
  } catch (e) {
    console.error(e);
    return { error: 'There was an error', result: null };
  }
};
