'use client';

import React from 'react';
import { DateRange } from 'react-day-picker';
import { useRouter } from 'next/navigation';
import { SearchBoxSuggestion } from '@mapbox/search-js-core';

export interface LocationFilterData extends SearchBoxSuggestion {
  lat: number;
  lon: number;
}

interface FilterDataType {
  location?: Partial<LocationFilterData>;
  date?: DateRange;
}

const DefaultFilterData: FilterDataType = {
  location: {},
  date: undefined,
};

type TFilterState = {
  selectedLocation: object;
  selectedDateRange: object;
};

type TLocation = {
  lat: number;
  lon: number;
};

type TDateRange = {
  from?: string;
  to?: string;
};

type TPriceRange = {
  min?: number;
  max?: number;
};

type TQueryParams = TLocation & TDateRange & TPriceRange;

const FilterContext = React.createContext<
  | [FilterDataType, React.Dispatch<React.SetStateAction<FilterDataType>>]
  | undefined
>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filterData, setFilterData] = React.useState(DefaultFilterData);

  return (
    <FilterContext.Provider value={[filterData, setFilterData]}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const [filterData, setFilterData] = React.useContext(FilterContext) || [];

  const router = useRouter();

  if (filterData === undefined || setFilterData === undefined) {
    throw new Error('useCounter must be used within a CounterProvider');
  }

  const updateParams = (params: Partial<FilterDataType>) => {
    setFilterData((prev) => {
      return { ...prev, ...params };
    });
  };

  function handleSearch() {
    let query = '';

    if (filterData) {
      Object.keys(filterData)
        .filter((key: string) => {
          return filterData[key as keyof typeof filterData] !== undefined;
        })
        .map((key) => {});
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
