'use client';

import React, { useEffect, useState } from 'react';
import {
  ListingSearchItem,
  ListingSearchResponseData,
  QueryParams,
  searchListings,
} from '@/lib/cimi/api/search';
import { PropertyListSearchItem } from '@/app/(site)/(renting)/search/PropertyList';
import { Button } from '@/components/ui/button';
import { handleScroll } from 'react-remove-scroll/dist/es5/handleScroll';
import { Loader2 } from 'lucide-react';
import { delay } from '@/lib/utils';

function Scroller({
  params,
  initialData,
}: {
  params: Partial<QueryParams>;
  initialData: ListingSearchResponseData;
}) {
  const pageCount = initialData.pages;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = React.useState<ListingSearchItem[]>(
    reduceTo(initialData.listings)
  );
  function reduceTo(data: { listing: ListingSearchItem; distance: number }[]) {
    return data.reduce((acc: ListingSearchItem[], item) => {
      return [...acc, item.listing];
    }, []);
  }

  function appendResults(results: ListingSearchResponseData) {
    setData((prevState) => {
      return [...prevState, ...reduceTo(results.listings)];
    });
  }

  async function loadMore() {
    setLoading(true);
    const data = await searchListings(params, page);

    if (!data.error && data.result) {
      appendResults(data.result);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (page > 1 && page < pageCount) {
      loadMore();
    }
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if user has scrolled to near bottom of the page (e.g., 80% of the document height)
      if (scrollTop + windowHeight >= documentHeight * 0.9 && !loading) {
        setPage((prevState) => prevState + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, loadMore]);

  return (
    <>
      <div
        className={`flex w-full flex-col gap-8 pt-8 sm:grid sm:grid-cols-2 md:grid-cols-3 md:pt-16
          lg:grid-cols-5`}
      >
        {data?.map((result, index) => (
          <PropertyListSearchItem
            className={'col-span-1'}
            key={index}
            listing={result}
          />
        ))}
      </div>
      {loading && <Loader2 className={'animate-spin pt-8'} />}
    </>
  );
}

export default Scroller;
