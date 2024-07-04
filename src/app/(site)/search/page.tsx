import React, { Suspense } from 'react';
import PropertyList from '@/components/search/PropertyList';
import { QueryParams } from '@/lib/cimi/api/search';
import MainSearchModal from '@/components/search/MainSearchModal';
import AdvancedSearchModal from '@/components/search/advanced/AdvancedSearchModal';
import AmenitiesFilter from '@/components/search/advanced/amenity/AmenitiesFilter';
import PriceFilter from '@/components/search/advanced/price/PriceFilter';
import SearchSkeleton from '@/components/search/SearchSkeleton';

async function Page({
  searchParams,
}: {
  searchParams: Partial<{
    query: string;
    lat: string;
    lon: string;
    from: string;
    to: string;
    page: string;
  }>;
}) {
  return (
    <div
      className={`flex min-h-[calc(100svh-4rem)] flex-col flex-wrap content-start items-start
        justify-center md:flex-row`}
    >
      <div className={'flex w-full pt-6'}>
        <div className={'flex-1'}>
          <MainSearchModal />
        </div>
        <AdvancedSearchModal>
          <PriceFilter />
          <AmenitiesFilter />
        </AdvancedSearchModal>
      </div>
      <Suspense fallback={<SearchSkeleton />}>
        <PropertyList params={searchParams as Partial<QueryParams>} />
      </Suspense>
    </div>
  );
}

export default Page;
