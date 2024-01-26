'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchCoordinatesFilter from '@/components/SearchCoordinatesFilter';
import DatePickerFilter from '@/components/DatePickerFilter';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SearchBoxDrawer from '@/components/SearchBoxDrawer';

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

  const [searchBoxDrawerState, setSearchBoxDrawerState] = useState(false);

  return (
    <div className={'bg-gray-100 p-6'}>
      <Accordion
        type="single"
        collapsible
        className={'flex w-full flex-col gap-6'}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h1 className={'text-lg font-bold text-primary'}>Where to?</h1>
          </AccordionTrigger>
          <AccordionContent>
            <button
              onClick={() => setSearchBoxDrawerState((prevState) => !prevState)}
            >
              Search
            </button>
            <SearchBoxDrawer
              isOpen={searchBoxDrawerState}
              setIsOpen={setSearchBoxDrawerState}
            />

            <SearchCoordinatesFilter
              {...filterValues}
              updateParams={updateParams}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            <DatePickerFilter />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <button className={'fixed bottom-6 right-6'} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default Page;
