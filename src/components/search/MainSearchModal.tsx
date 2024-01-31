'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import * as Dialog from '@radix-ui/react-dialog';
import { Search, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Calendar } from '@/components/ui/calendar';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  NewSearchInput,
  SearchBox,
  SearchItem,
  SearchOptions,
} from '@/components/ui/searchBox';
import { SearchBoxSuggestion } from '@mapbox/search-js-core';
import { DateRange } from 'react-day-picker';
import {
  getLocationDetails,
  getLocationSuggestions,
} from '@/app/search/actions';
import { formatDateToDDMMYY } from '@/lib/utils';
import { LocationFilterData, useFilter } from '@/lib/filter/useFilter';

function locationToString(
  location?: Partial<LocationFilterData>,
  placeholder = ''
) {
  if (!location || (!location.name && !location.place_formatted)) {
    return placeholder;
  }

  return `${location.name}, ${location.place_formatted}`;
}

export function dateRangeToString(range: DateRange, placeholder = '') {
  if (!range.from && !range.to) {
    return placeholder;
  }

  return `From: ${formatDateToDDMMYY(range.from)} - To: ${formatDateToDDMMYY(range.to)}`;
}

function ModalTrigger({
  location,
  range,
}: {
  location?: Partial<LocationFilterData>;
  range?: DateRange;
}) {
  return (
    <Dialog.Trigger asChild>
      <Button
        className={'flex h-fit w-full justify-start rounded-lg p-2'}
        variant="outline"
      >
        <Search />
        <div className={'flex flex-col items-start pl-4'}>
          <h1 className={'font-bold'}>
            {locationToString(location, 'Find a place...')}
          </h1>
          {range && (
            <p className={'text-xs text-gray-500'}>
              {dateRangeToString(range)}
            </p>
          )}
        </div>
      </Button>
    </Dialog.Trigger>
  );
}

function MainSearchModal() {
  const [accordionItem, setAccordionItem] = useState('one');
  const [searchDrawerState, setSearchDrawerState] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchBoxSuggestion[]>([]);
  const { data, handleSearch, updateParams } = useFilter();

  async function handleSelection(value: SearchBoxSuggestion) {
    const feature = await getLocationDetails(value.mapbox_id);

    updateParams({
      location: {
        ...value,
        lat: feature?.properties.coordinates.latitude,
        lon: feature?.properties.coordinates.longitude,
      },
    });

    setSearchDrawerState(false);
    setAccordionItem('two');
  }

  useEffect(() => {
    const fetchSuggestions = async () => {
      return await getLocationSuggestions(query);
    };

    if (query !== '') {
      fetchSuggestions().then((r) => setSuggestions(r));
    }
  }, [query]);

  function renderHelper() {
    if (query === '') {
      return null;
    }

    return <p className={'text-center'}>Not found...</p>;
  }

  return (
    <>
      <Dialog.Root>
        <ModalTrigger location={data.location} range={data.date} />
        <Dialog.Content className="fixed left-0 top-0 h-full w-full bg-gray-100 p-2">
          <div className={'flex flex-col'}>
            <div
              className={
                'space-y-1.5 self-start pl-6 pt-6 text-center sm:text-left'
              }
            >
              <Dialog.Close>
                <X>Close</X>
              </Dialog.Close>
            </div>

            <div className={'h-full bg-gray-100 p-6'}>
              <Accordion
                value={accordionItem}
                onValueChange={setAccordionItem}
                type="single"
                className="flex w-full flex-col gap-6"
              >
                <AccordionItem value="one">
                  <AccordionTrigger>
                    <h1 className={'text-lg font-bold text-primary'}>
                      Where to?
                    </h1>
                    <span className={'text-xs font-normal text-gray-500'}>
                      {locationToString(data.location)}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <button
                      className={
                        'flex w-full gap-2 rounded border border-gray-200 px-2 py-2 text-gray-500'
                      }
                      onClick={() => setSearchDrawerState(true)}
                    >
                      {locationToString(
                        data.location,
                        'Search for a destination...'
                      )}
                    </button>
                    <Drawer
                      open={searchDrawerState}
                      onClose={() => setSearchDrawerState(false)}
                    >
                      <DrawerContent>
                        <div
                          className="mx-auto flex h-[48rem] w-full max-w-md flex-col overflow-auto rounded-t-[10px]
                            p-4"
                        >
                          <DrawerHeader>
                            <DrawerTitle>Where to?</DrawerTitle>
                            <DrawerDescription>
                              Select a location where you want to search
                              listings.
                            </DrawerDescription>
                          </DrawerHeader>
                          <SearchBox
                            value={data.location}
                            onChange={handleSelection}
                          >
                            <NewSearchInput
                              handleClear={() => {
                                setQuery('');
                                updateParams({
                                  location: { name: '', place_formatted: '' },
                                });
                              }}
                              displayValue={(location: SearchBoxSuggestion) =>
                                locationToString(location)
                              }
                              onChange={(e) => setQuery(e.target.value)}
                              displayClear={query === ''}
                              placeholder={'Search for a destination...'}
                            />
                            <SearchOptions>
                              {suggestions.length > 0
                                ? suggestions.map((suggestion, index) => (
                                    <SearchItem
                                      key={`${suggestion.name}-${index}`}
                                      value={suggestion}
                                    >
                                      {locationToString(suggestion)}
                                    </SearchItem>
                                  ))
                                : renderHelper()}
                            </SearchOptions>
                          </SearchBox>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="two">
                  <AccordionTrigger>
                    <h1 className={'text-lg font-bold text-primary'}>When?</h1>
                    {data.date && (
                      <span className={'text-xs font-normal text-gray-500'}>
                        {dateRangeToString(data.date)}
                      </span>
                    )}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Calendar
                      mode="range"
                      selected={data.date}
                      onSelect={(range) => {
                        updateParams({ date: range });
                      }}
                      className="rounded-md border shadow"
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <button className={'fixed bottom-6 right-6'} onClick={handleSearch}>
            Search
          </button>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}

export default MainSearchModal;
