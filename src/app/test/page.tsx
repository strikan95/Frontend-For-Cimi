'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  NewSearchInput,
  SearchBox,
  SearchItem,
  SearchOptions,
} from '@/components/ui/searchBox';
import {
  getLocationDetails,
  getLocationSuggestions,
} from '@/app/search/actions';
import { SearchBoxSuggestion } from '@mapbox/search-js-core';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function DialogDemo() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    console.log(username);
  }, [username]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              placeholder="@peduarte"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const pastMonth = new Date(2020, 10, 15);

interface LocationFilterData extends SearchBoxSuggestion {
  lat: number;
  lon: number;
}

export default function Page() {
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

  return (
    <div className={'h-full bg-gray-100 p-6'}>
      <Accordion
        value={accordionItem}
        onValueChange={setAccordionItem}
        type="single"
        className="flex w-full flex-col gap-6"
      >
        <AccordionItem value="one">
          <AccordionTrigger>
            <h1 className={'text-lg font-bold text-primary'}>Where to?</h1>
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

      <DialogDemo />
    </div>
  );
}
