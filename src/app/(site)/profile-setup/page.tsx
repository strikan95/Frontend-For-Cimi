import React from 'react';
import { getSession } from '@auth0/nextjs-auth0';
import ProfileSetupForm from '@/app/(site)/profile-setup/ProfileSetupForm';
import { getUserProfileData } from '@/lib/auth/profile';
import { ApiProfile } from '@/lib/cimi/types/profile.types';

async function Page() {
  const session = await getSession();

  if (!session || !session.user) {
    return <>Error.</>;
  }

  const res = await getUserProfileData();
  if (res.error || !res.result) {
    return <>Error.</>;
  }

  const apiUserData = res.result;
  const userData: ApiProfile = {
    id: apiUserData.id,
    picture: apiUserData.picture || session.user.picture,
    roles: apiUserData.roles,
    email: apiUserData.email || session.user.email,
    userDetails: {
      firstName: apiUserData.userDetails.firstName || session.user.first_name,
      lastName: apiUserData.userDetails.lastName || session.user.given_name,
    },
  };

  return (
    <main className="flex min-h-screen w-full justify-center py-1">
      <div className="p-2 md:p-4">
        <div className="mt-8 w-full px-6 pb-8 sm:max-w-xl sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">
            Set Up Your Profile
          </h2>
          <ProfileSetupForm apiUserData={userData} />
        </div>
      </div>
    </main>
  );
}

export default Page;
