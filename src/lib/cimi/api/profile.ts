'use server';

import { ServerActionResponse } from '@/types/serverAction.types';
import { CimiApiProfile } from '@/lib/cimi/types/profile.types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function updateUserProfile(formData: {
  firstName: string;
  lastName: string;
}): Promise<ServerActionResponse<CimiApiProfile>> {
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`http://localhost:8080/api/v1/users/me`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        ContentType: 'multipart/form',
        Authorization: `Bearer ${session?.token}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      return { error: 'Ops, something went wrong.', result: null };
    }

    const data = (await res.json()) as CimiApiProfile;

    return { error: null, result: data };
  } catch (e) {
    console.error(e);
    return {
      error: 'Network Error: Failed to update user profile',
      result: null,
    };
  }
}

export async function updateUserProfileImage(
  formData: FormData
): Promise<ServerActionResponse<CimiApiProfile>> {
  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`http://localhost:8080/api/v1/users/me/image`, {
      method: 'POST',
      body: formData,
      headers: {
        ContentType: 'multipart/form',
        Authorization: `Bearer ${session?.token}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      return { error: 'Ops, something went wrong.', result: null };
    }

    const data = (await res.json()) as CimiApiProfile;

    return { error: null, result: data };
  } catch (e) {
    console.error(e);
    return { error: 'Network Error: Failed to fetch draft data', result: null };
  }
}

export const getUserProfileData = async (): Promise<
  ServerActionResponse<CimiApiProfile>
> => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { error: 'Missing access token', result: null };
  }

  try {
    const res = await fetch(`http://localhost:8080/api/v1/users/me`, {
      method: 'GET',
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      return { error: 'Error ' + res.status, result: null };
    }

    const data: CimiApiProfile = await res.json();

    return { error: null, result: data };
  } catch (e) {
    console.error(e);
    return { error: 'There was an error', result: null };
  }
};
