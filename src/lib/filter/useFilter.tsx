'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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
  priceMin?: string;
  priceMax?: string;
};

type TAmenities = {
  amenities: string[];
};

type TPaginator = {
  page: string;
};

export type TFilterParams = TLocation &
  TPoi &
  TDateRange &
  TPriceRange &
  TAmenities &
  TPaginator;

const FilterContext = React.createContext<
  | [TFilterParams, React.Dispatch<React.SetStateAction<TFilterParams>>]
  | undefined
>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filterData, setFilterData] = React.useState<TFilterParams>({
    amenities: [],
    page: '1',
  });

  return (
    <FilterContext.Provider value={[filterData, setFilterData]}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter(initialValues?: TFilterParams) {
  const [filterData, setFilterData] = React.useContext(FilterContext) || [];
  const router = useRouter();
  const params = useSearchParams();

  React.useEffect(() => {
    params.forEach((value, key) => {
      let param: Partial<TFilterParams> = {};
      // @ts-ignore
      param[key] = value;
      updateParams(param);
    });

    if (initialValues) {
      updateParams(initialValues);
    }
  }, []);

  if (filterData === undefined || setFilterData === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }

  const updateParams = (params: Partial<TFilterParams>) => {
    setFilterData((prev) => {
      return { ...prev, ...params };
    });
  };

  const clearParams = () => {
    setFilterData({
      amenities: [],
      page: filterData.page,
    });
  };

  function handleSearch() {
    if (filterData) {
      const query = Object.keys(filterData)
        .filter((key: string) => {
          return !(
            filterData[key as keyof typeof filterData] == undefined ||
            filterData[key as keyof typeof filterData] == null ||
            filterData[key as keyof typeof filterData] == ''
          );
        })
        .map((key: string) => {
          const value = filterData[key as keyof typeof filterData];

          if (Array.isArray(value)) {
            return value
              .map((item) => `${key}[]=${encodeURIComponent(item as string)}`)
              .join('&');
          }

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
    clearParams,
    handleSearch,
    canDoAdvanced: filterData.poi !== undefined,
  };
}
