import React, { Suspense } from 'react';
import {
  ListingSearchItem,
  QueryParams,
  searchListings,
} from '@/lib/cimi/api/search';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function PropertyListItem({
  className,
  listing,
}: {
  className?: string;
  listing: ListingSearchItem;
}) {
  return (
    <div className={cn('', className)}>
      <Link className={'flex h-full flex-col'} href={`/listing/${listing.id}`}>
        <div
          className={
            'relative aspect-square overflow-hidden rounded-lg sm:max-w-full'
          }
        >
          <Suspense>
            <Image
              fill={true}
              src={listing.coverImageUrl}
              alt={''}
              sizes={'500px'}
              style={{ objectFit: 'cover' }}
            />
          </Suspense>
        </div>
        <h1 className={'text-md pt-2 font-bold text-gray-700'}>
          {listing.title}
        </h1>
        <p className={'text-sm text-gray-500'}>
          {listing.location.city}, {listing.location.country}
        </p>
        <p className={'text-sm text-gray-500'}>Avaliable from 1. Jul.</p>
        <p
          className={`flex grow flex-col justify-end place-self-end pt-2 font-bold text-gray-700`}
        >
          {listing.price}€ a month
        </p>
      </Link>
    </div>
  );
}

async function PropertyList({ params }: { params: Partial<QueryParams> }) {
  const data = await searchListings(params);

  if (data.error || !data.result) {
    return <div>{data.error}</div>;
  }

  const listings = data.result.listings;

  return (
    <div
      className={`flex w-full flex-col gap-8 pt-8 sm:grid sm:grid-cols-2 md:grid-cols-3 md:pt-16
        lg:grid-cols-5`}
    >
      {listings.length > 0 &&
        listings.map((result, index) => (
          <PropertyListItem
            className={'col-span-1'}
            key={index}
            listing={result.listing}
          />
        ))}
    </div>
  );
}

export default PropertyList;
