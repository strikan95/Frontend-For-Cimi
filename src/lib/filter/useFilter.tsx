'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import page from '@/app/(site)/search/page';

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
  page: number;
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
    amenities: new Array(0),
    page: 1,
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
  const pathname = usePathname();

  React.useEffect(() => {
    let amenities = new Array(0);
    params.forEach((value, key) => {
      if (key === 'amenities') {
        amenities.push(value);
      }
    });

    params.forEach((value, key) => {
      let param: Partial<TFilterParams> = {};
      // @ts-ignore
      param[key] = value;
      if (key === 'page') {
        param[key] = parseInt(value);
      }
      if (key === 'amenities') return;
      updateParams(param);
    });

    updateParams({ amenities: amenities });

    if (initialValues) {
      updateParams(initialValues);
    }
  }, []);

  React.useEffect(() => {
    if (pathname === '/search' && filterData?.page && filterData.page >= 1) {
      handleSearch(false);
    }
  }, [filterData?.page]);

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
      amenities: new Array(0),
      page: 1,
    });
  };

  function handleSearch(reset: boolean) {
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

          if (reset && key === 'page') {
            updateParams({ page: 1 });
            return `${key}=${encodeURIComponent('1')}`;
          }

          if (Array.isArray(value)) {
            return value
              .map((item) => `${key}=${encodeURIComponent(item as string)}`)
              .join('&');
          }

          return `${key}=${encodeURIComponent(value as string)}`;
        })
        .join('&');

      router.push(`/search?${query}`);
    }
  }

  return {
    data: filterData,
    updateParams,
    clearParams,
    handleSearch,
    canDoAdvanced: filterData.poi !== undefined,
  };
}
