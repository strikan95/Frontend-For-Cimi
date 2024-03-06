import React from 'react';
import PropertyList from '@/app/(site)/(renting)/search/PropertyList';
import { QueryParams } from '@/lib/cimi/api/search';

async function Page({
  searchParams,
}: {
  searchParams: Partial<{
    query: string;
    lat: string;
    lon: string;
    from: string;
    to: string;
  }>;
}) {
  return (
    <div
      className={`flex min-h-[calc(100svh-4rem)] flex-col flex-wrap items-start justify-center
        md:flex-row`}
    >
      <PropertyList params={searchParams as Partial<QueryParams>} />
    </div>
  );
}

export default Page;
