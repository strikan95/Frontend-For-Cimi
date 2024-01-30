'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapBoxLocationDetails } from '@/app/search/actions';
import MainSearchModal from '@/components/search/MainSearchModal';

type FilterParams = {
  location: {
    details: MapBoxLocationDetails;
    data: {
      lat: string;
      lon: string;
    };
  };
  price: {
    priceMin: number;
    priceMax: number;
  };
};

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

  useEffect(() => {
    console.log(filterValues);
  }, [filterValues]);

  return (
    <div className={'bg-gray-100 p-6'}>
      <MainSearchModal />
      <button className={'fixed bottom-6 right-6'} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default Page;
