import React from 'react';
import { searchListings } from '@/lib/cimi/api/search';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function PropertyListItem({
  className,
  id,
  title,
  src,
}: {
  className?: string;
  id: string;
  title: string;
  src: string;
}) {
  return (
    <div className={cn('', className)}>
      <Link className={'flex h-full flex-col'} href={`/listing/${id}`}>
        <div
          className={
            'relative aspect-square overflow-hidden rounded-lg sm:max-w-full'
          }
        >
          <Image
            fill={true}
            src={src}
            alt={''}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <h1 className={'text-md pt-2 font-bold text-gray-700'}>{title}</h1>
        <p className={'text-sm text-gray-500'}>Zagreb</p>
        <p className={'text-sm text-gray-500'}>Avaliable from 1. Jul.</p>
        <p
          className={`flex grow flex-col justify-end place-self-end pt-2 font-bold text-gray-700`}
        >
          300€ a month
        </p>
      </Link>
    </div>
  );
}

async function PropertyList({ query }) {
  const data = await searchListings();

  if (data.error || !data.result) {
    return <div>{data.error}</div>;
  }

  const listings = data.result;

  return (
    <div
      className={`flex w-full flex-col gap-8 pt-8 sm:grid sm:grid-cols-2 md:grid-cols-3 md:pt-16
        lg:grid-cols-5`}
    >
      {listings.map((listing, index) => (
        <PropertyListItem
          className={'col-span-1'}
          key={index}
          id={listing.id.toString()}
          title={listing.title}
          src={listing.coverImageUrl}
        />
      ))}
    </div>
  );
}

export default PropertyList;
