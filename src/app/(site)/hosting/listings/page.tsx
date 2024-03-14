import React from 'react';
import PropertyList from '@/app/(site)/hosting/_components/list/PropertyList';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Page = withPageAuthRequired(
  async () => {
    return (
      <div
        className={
          'relative flex min-h-[calc(100svh-4rem)] flex-col gap-6 pt-8'
        }
      >
        <PropertyList />
      </div>
    );
  },
  { returnTo: '/hosting/listings' }
);

export default Page;
