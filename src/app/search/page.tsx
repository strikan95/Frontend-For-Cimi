'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainSearchModal from '@/components/search/MainSearchModal';

type QueryParams = {
  location: string;
  lat: string;
  lon: string;
  priceMin: string;
  priceMax: string;
};

function Page() {
  const [filterValues, setFilterValues] = useState<QueryParams>({
    location: '',
    lat: '',
    lon: '',
    priceMin: '',
    priceMax: '',
  });

  const router = useRouter();

  const handleSearch = () => {
    const searchQuery = Object.keys(filterValues)
      .filter((key) => filterValues[key as keyof typeof filterValues] !== '')
      .map(
        (key) =>
          `${key}=${encodeURIComponent(filterValues[key as keyof typeof filterValues])}`
      )
      .join('&');

    router.push(`/results?${searchQuery}`);
  };

  const updateParams = (params: Partial<QueryParams>) => {
    setFilterValues((prev) => {
      return { ...prev, ...params };
    });
  };

  return (
    <div className={'p-2'}>
      <MainSearchModal />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Page;
