'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import * as Dialog from '@radix-ui/react-dialog';
import { Search } from 'lucide-react';
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
import { addDays } from 'date-fns';
import {
  getLocationDetails,
  getLocationSuggestions,
} from '@/app/search/actions';

const pastMonth = new Date(2020, 10, 15);

interface LocationFilterData extends SearchBoxSuggestion {
  lat: number;
  lon: number;
}

function ModalTrigger({ username }: { username: string }) {
  return (
    <Dialog.Trigger asChild>
      <Button
        className={'flex w-full justify-start gap-2 rounded-lg'}
        variant="outline"
      >
        <Search />
        {username ? username : 'Find A Place...'}
      </Button>
    </Dialog.Trigger>
  );
}

function MainSearchModal() {
  const [username, setUsername] = useState('');
  const [accordionItem, setAccordionItem] = useState('one');

  const [searchDrawerState, setSearchDrawerState] = useState(false);

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchBoxSuggestion[]>([]);

  const [location, setLocation] = useState<Partial<LocationFilterData>>({
    name: '',
    place_formatted: '',
  });

  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  async function handleSelection(value: SearchBoxSuggestion) {
    const feature = await getLocationDetails(value.mapbox_id);
    setLocation({
      ...value,
      lat: feature?.properties.coordinates.latitude,
      lon: feature?.properties.coordinates.longitude,
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

  useEffect(() => {
    console.log(location);
  }, [location]);

  function renderHelper() {
    if (query === '') {
      return null;
    }

    return <p className={'text-center'}>Not found...</p>;
  }
  useEffect(() => {
    console.log(username);
  }, [username]);

  return (
    <>
      <Dialog.Root>
        <ModalTrigger username={username} />
        <Dialog.Content className="fixed left-0 top-0 h-full w-full bg-gray-100 p-2">
          <div className={'flex flex-col'}>
            <div
              className={'flex flex-col space-y-1.5 text-center sm:text-left'}
            >
              <Dialog.Title
                className={'text-lg font-semibold leading-none tracking-tight'}
              >
                Edit profile
              </Dialog.Title>
              <Dialog.Description className={'text-sm text-muted-foreground'}>
                Make changes to your profile here. Click save when you're done.
              </Dialog.Description>
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
                    {location.name && location.place_formatted && (
                      <span
                        className={'text-xs font-normal text-gray-500'}
                      >{`${location.name}, ${location.place_formatted}`}</span>
                    )}
                  </AccordionTrigger>
                  <AccordionContent>
                    <button
                      className={
                        'flex w-full gap-2 rounded border border-gray-200 px-2 py-2 text-gray-500'
                      }
                      onClick={() => setSearchDrawerState(true)}
                    >
                      {location.name && location.place_formatted
                        ? `${location.name}, ${location.place_formatted}`
                        : 'Search for a destination...'}
                    </button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="two">
                  <AccordionTrigger>
                    <h1 className={'text-lg font-bold text-primary'}>When?</h1>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Calendar
                      mode="range"
                      selected={range}
                      onSelect={setRange}
                      className="rounded-md border shadow"
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div>
              <Button type="submit">Save changes</Button>
              <Dialog.Close>
                <Button>Close</Button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>

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
                Select a location where you want to search listings.
              </DrawerDescription>
            </DrawerHeader>
            <SearchBox value={location} onChange={handleSelection}>
              <NewSearchInput
                handleClear={() => {
                  setQuery('');
                  setLocation({ name: '', place_formatted: '' });
                }}
                displayValue={(location: SearchBoxSuggestion) =>
                  location.name && location.place_formatted
                    ? `${location.name}, ${location.place_formatted}`
                    : ''
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
                        {`${suggestion.name}, ${suggestion.place_formatted}`}
                      </SearchItem>
                    ))
                  : renderHelper()}
              </SearchOptions>
            </SearchBox>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MainSearchModal;
