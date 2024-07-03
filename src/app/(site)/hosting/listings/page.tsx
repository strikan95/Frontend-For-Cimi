import React, { Suspense } from 'react';
import PropertyList from '@/app/(site)/hosting/_components/list/PropertyList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function Page() {
  return (
    <div
      className={'relative flex min-h-[calc(100svh-4rem)] flex-col gap-6 pt-8'}
    >
      <div>
        <div className={'flex items-center justify-between pb-8'}>
          <h1 className={'text-3xl font-bold'}>My Listings</h1>
          <Button asChild={true}>
            <Link href={'/create-a-listing'}>Create a new listing</Link>
          </Button>
        </div>

        <Suspense fallback={<div>Loading</div>}>
          <PropertyList />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
