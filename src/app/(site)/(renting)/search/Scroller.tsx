'use client';

import React, { useEffect, useState } from 'react';
import {
  ListingSearchResponseData,
  QueryParams,
  searchListings,
} from '@/lib/cimi/api/search';
import { PropertyListSearchItem } from '@/app/(site)/(renting)/search/PropertyList';
import { Loader2 } from 'lucide-react';

function Scroller({
  params,
  initialData,
}: {
  params: Partial<QueryParams>;
  initialData: ListingSearchResponseData;
}) {
  const [pages, setPages] = useState<ListingSearchResponseData[]>([
    initialData,
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadNext() {
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
      loadNext();
    }
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = async () => {
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
        {pages?.map((page, index) =>
          page.listings.map((item) => (
            <PropertyListSearchItem
              className={'col-span-1'}
              key={index}
              listing={item.listing}
            />
          ))
        )}
      </div>
      {loading && <Loader2 className={'animate-spin pt-8'} />}
    </>
  );
}

export default Scroller;
