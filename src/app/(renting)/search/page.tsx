'use client';

import React, { Suspense } from 'react';
import MainSearchModal from '@/components/search/MainSearchModal';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { TFilterParams, useFilter } from '@/lib/filter/useFilter';

function SearchFilter() {
  const filterParams = resolveQueryParams(useSearchParams());

  useFilter(filterParams);

  function resolveQueryParams(params: ReadonlyURLSearchParams) {
    return { ...Object.fromEntries(params.entries()) };
  }

  const debugRenderParams = (params: TFilterParams): React.ReactNode[] => {
    return Object.entries(params).reduce((acc, [key, value]) => {
      acc.push(
        <div key={key} className={'flex text-lg'}>
          <h1 className={'font-bold'}>{key}: </h1>
          <span>{value}</span>
        </div>
      );
      return acc;
    }, [] as React.ReactNode[]);
  };

  return (
    <div className={'flex w-full flex-col items-center p-2'}>
      {...debugRenderParams(filterParams)}
      <div className={'w-full bg-gray-100 p-6'}>
        <MainSearchModal />
      </div>
    </div>
  );
}

function Page() {
  return (
    <Suspense>
      <SearchFilter />
    </Suspense>
  );
}

export default Page;