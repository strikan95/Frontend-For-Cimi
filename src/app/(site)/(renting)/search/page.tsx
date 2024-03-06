import React from 'react';
import PropertyList from '@/app/(site)/(renting)/search/PropertyList';

function Page({
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
      className={`flex min-h-[calc(100svh-4rem)] flex-col flex-wrap items-center justify-center
        md:flex-row`}
    >
      <PropertyList query={searchParams} />
    </div>
  );
}

export default Page;
