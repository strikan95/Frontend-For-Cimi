import React, { Suspense } from 'react';
import ProfileForm from '@/components/profile/ProfileForm';
import { getUserProfileData } from '@/lib/cimi/api/profile';

async function Page() {
  const res = await getUserProfileData();

  if (res.error || res.result == null) {
    throw new Error(res.error || 'Error getting profile data');
  }

  return (
    <div
      className={'relative flex min-h-[calc(100svh-4rem)] flex-col gap-6 pt-8'}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileForm profileData={res.result} />
      </Suspense>
    </div>
  );
}

export default Page;
