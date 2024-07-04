'use server';

import { ServerActionResponse } from '@/types/serverAction.types';
import { CimiApiProfile } from '@/lib/cimi/types/profile.types';
import { RegisterUserDto } from '@/lib/cimi/types/register.types';

export async function registerUser(
  formData: RegisterUserDto
): Promise<ServerActionResponse<CimiApiProfile>> {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/register`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        ContentType: 'application/json',
      },
      cache: 'no-cache',
    });

    if (!res.ok) {
      return {
        error: 'Ops, something went wrong. ' + res.status,
        result: null,
      };
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
