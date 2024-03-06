'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type TLocation = {
  query?: string;
  lat?: string;
  lon?: string;
};

type TPoi = {
  poi?: string;
};

type TDateRange = {
  from?: string;
  to?: string;
};

type TPriceRange = {
  min?: string;
  max?: string;
};

export type TFilterParams = TLocation & TPoi & TDateRange & TPriceRange;

const FilterContext = React.createContext<
  | [TFilterParams, React.Dispatch<React.SetStateAction<TFilterParams>>]
  | undefined
>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filterData, setFilterData] = React.useState<TFilterParams>({});

  return (
    <FilterContext.Provider value={[filterData, setFilterData]}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter(initialValues?: TFilterParams) {
  const [filterData, setFilterData] = React.useContext(FilterContext) || [];

  React.useEffect(() => {
    if (initialValues) {
      updateParams(initialValues);
    }
  }, []);

  const router = useRouter();

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
      const query = Object.keys(filterData)
        .filter((key: string) => {
          return (
            filterData[key as keyof typeof filterData] !== undefined ||
            filterData[key as keyof typeof filterData] !== null ||
            filterData[key as keyof typeof filterData] !== ''
          );
        })
        .map((key: string) => {
          const value = filterData[key as keyof typeof filterData];
          return `${key}=${encodeURIComponent(value as string)}`;
        })
        .join('&');

      router.push(`/search?${query}`);
    }

    //Show some error...
  }
  return {
    data: filterData,
    updateParams,
    handleSearch,
  };
}
