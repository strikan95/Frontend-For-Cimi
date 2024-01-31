'use client';

import React from 'react';
import { SearchBoxSuggestion } from '@mapbox/search-js-core';

export interface LocationFilterData extends SearchBoxSuggestion {
  lat: number;
  lon: number;
}

type TLocation = {
  query: string;
  lat?: number;
  lon?: number;
};

type TDateRange = {
  from?: string;
  to?: string;
};

type TPriceRange = {
  min?: number;
  max?: number;
};

type TFilterParams = TLocation & TDateRange & TPriceRange;

const FilterContext = React.createContext<
  | [TFilterParams, React.Dispatch<React.SetStateAction<TFilterParams>>]
  | undefined
>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filterData, setFilterData] = React.useState<TFilterParams>({
    query: '',
  });

  return (
    <FilterContext.Provider value={[filterData, setFilterData]}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const [filterData, setFilterData] = React.useContext(FilterContext) || [];

  if (filterData === undefined || setFilterData === undefined) {
    throw new Error('useCounter must be used within a CounterProvider');
  }

  const updateParams = (params: Partial<TFilterParams>) => {
    setFilterData((prev) => {
      return { ...prev, ...params };
    });
  };

  function handleSearch() {
    if (filterData) {
      Object.keys(filterData).filter((key: string) => {
        return filterData[key as keyof typeof filterData] !== undefined;
      });
    }

    //router.push(`/results`);
  }
  return {
    data: filterData,
    updateParams,
    handleSearch,
  };
}

//const search = () => {
//  const searchQuery = Object.keys(filterValues)
//    .filter((key) => filterValues[key as keyof typeof filterValues] !== '')
//    .map(
//      (key) =>
//        `${key}=${encodeURIComponent(filterValues[key as keyof typeof filterValues])}`
//    )
//    .join('&');

//  router.push(`/results?${searchQuery}`);
//};
