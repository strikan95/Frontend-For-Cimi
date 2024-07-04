import { getCurrentHostListings } from '@/lib/cimi/api/host';
import React from 'react';
import PropertyListItem from '@/components/host/list/PropertyListItem';

async function PropertyList() {
  const data = await getCurrentHostListings();

  if (data.error || !data.result) {
    return null;
  }

  const listings = data.result;

  if (listings?.length <= 0) {
    return <h1 className={'text-xl text-gray-500'}>No listings</h1>;
  }

  return (
    <div className={'grid grid-cols-1 gap-6 md:grid-cols-2'}>
      {listings.map((listing, index) => (
        <PropertyListItem key={index} className={'col-span-1'} {...listing} />
      ))}
    </div>
  );
}

export default PropertyList;
