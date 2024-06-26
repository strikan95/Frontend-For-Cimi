'use client';

import React, { Suspense, useEffect, useState } from 'react';
import {
  ListingSearchItem,
  ListingSearchResponseData,
  QueryParams,
  searchListings,
} from '@/lib/cimi/api/search';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

function PropertyListSearchItem({
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
              style={{ objectFit: 'cover' }}
            />
          </Suspense>
        </div>
        <h1 className={'text-md pt-2 font-bold text-gray-700'}>
          {listing?.title}
        </h1>
        <p className={'text-sm text-gray-500'}>
          {listing?.location?.city}, {listing?.location?.country}
        </p>
        <p className={'text-sm text-gray-500'}>Avaliable from 1. Jul.</p>
        <p
          className={`flex grow flex-col justify-end place-self-end pt-2 font-bold text-gray-700`}
        >
          {listing?.price}€ a month
        </p>
      </Link>
    </div>
  );
}

function Scroller({
  params,
  initialData,
}: {
  params: Partial<QueryParams>;
  initialData: ListingSearchResponseData;
}) {
  console.log('scroller entry');
  const [pages, setPages] = useState<ListingSearchResponseData[]>([
    initialData,
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadNext() {
    console.log('loading next');
    setLoading(true);
    const data = await searchListings(params, currentPage + 1);

    if (!data.error && data.result) {
      const newData = data.result;
      setPages((prevState) => [...prevState, newData]);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (currentPage > 1 && currentPage < initialData.pages) {
      console.log('starting load');
      loadNext();
    }
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = async () => {
      console.log('handling scroll here');
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (!loading && scrollTop + windowHeight >= documentHeight * 0.8) {
        setCurrentPage((prevState) => prevState + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <>
      <div
        className={`flex w-full flex-col gap-8 pt-8 sm:grid sm:grid-cols-2 md:grid-cols-3 md:pt-16
          lg:grid-cols-5`}
      >
        {pages.length > 0 &&
          pages.map((page, index) =>
            page.listings.map((item) => (
              <PropertyListSearchItem
                className={'col-span-1'}
                key={index}
                listing={item.listing}
              />
            ))
          )}
      </div>
      <Button onClick={() => setCurrentPage((prevState) => prevState + 1)}>
        Load more
      </Button>
      {loading && <Loader2 className={'animate-spin pt-8'} />}
    </>
  );
}

export default Scroller;
