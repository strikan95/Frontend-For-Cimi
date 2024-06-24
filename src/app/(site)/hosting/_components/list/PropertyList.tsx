import { getCurrentHostListings } from '@/lib/cimi/api/host';
import React from 'react';
import PropertyListItem from '@/app/(site)/hosting/_components/list/PropertyListItem';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

async function PropertyList() {
  const data = await getCurrentHostListings();

  if (data.error || !data.result) {
    return null;
  }

  const listings = data.result;

  if (listings?.length <= 0) {
    return null;
  }

  return (
    <div>
      <div className={'flex items-center justify-between pb-8'}>
        <h1 className={'text-3xl font-bold'}>My Listings</h1>
        <Button asChild={true}>
          <Link href={'/create-a-listing'}>Create a new listing</Link>
        </Button>
      </div>

      <div className={'grid grid-cols-1 gap-6 md:grid-cols-2'}>
        {listings.map((listing, index) => (
          <PropertyListItem key={index} className={'col-span-1'} {...listing} />
        ))}
      </div>
    </div>
  );
}

export default PropertyList;
