import React from 'react';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import ProfileImageUpdater from '@/app/(site)/profile-setup/ProfileImageUpdater';
import ProfileForm from '@/app/(site)/profile/ProfileForm';
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client';
import { ApiProfile } from '@/lib/cimi/types/profile.types';

async function Page() {
  const session = await getSession();
  const user: (UserProfile & ApiProfile) | undefined =
    session?.user as UserProfile & ApiProfile;

  if (!user) {
    return <>Error.</>;
  }

  return (
    <div
      className={'relative flex min-h-[calc(100svh-4rem)] flex-col gap-6 pt-8'}
    >
      <ProfileForm apiUserData={user} />
    </div>
  );
}

export default withPageAuthRequired(Page, { returnTo: '/' });
