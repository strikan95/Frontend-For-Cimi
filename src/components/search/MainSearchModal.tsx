'use client';

import React, { useState } from 'react';
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

import { useFilter } from '@/lib/filter/useFilter';
import MapBoxSearch from '@/components/search/MapBoxSearch';
import { format, parse } from 'date-fns';
import dynamic from 'next/dynamic';
import { FormStepProps } from '@/app/(wizard)/create-a-listing/components/Form1';

function MainSearchModal() {
  const [accordionItem, setAccordionItem] = useState('one');
  const [searchDrawerState, setSearchDrawerState] = useState(false);

  const { data, handleSearch, updateParams } = useFilter();

  function dateToString(date?: Date) {
    if (!date) return undefined;
    return format(date, 'yyyy-MM-dd');
  }
  function stringToDate(str?: string) {
    if (!str) return undefined;
    return parse(str, 'yyyy-MM-dd', new Date());
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button
            className={'flex h-fit w-full justify-start rounded-lg p-2'}
            variant="outline"
          >
            <Search />
            <div className={'flex flex-col items-start pl-4'}>
              <h1 className={'font-bold'}>{data.query || 'Find a place...'}</h1>
              {data.from && <p className={'text-xs text-gray-500'}>{''}</p>}
            </div>
          </Button>
        </Dialog.Trigger>
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
                      {data.query}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <button
                      className={
                        'flex w-full gap-2 rounded border border-gray-200 px-2 py-2 text-gray-500'
                      }
                      onClick={() => setSearchDrawerState(true)}
                    >
                      {data.query || 'Search for a destination...'}
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
                          <MapBoxSearch
                            value={data.query}
                            onChange={(value) => updateParams({ query: value })}
                            onFeature={(feature) => {
                              updateParams({
                                lat: feature.properties.coordinates.latitude.toString(),
                                lon: feature.properties.coordinates.longitude.toString(),
                              });
                              setSearchDrawerState(false);
                              setAccordionItem('two');
                            }}
                          />
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="two">
                  <AccordionTrigger>
                    <h1 className={'text-lg font-bold text-primary'}>When?</h1>
                    {data.from && (
                      <span className={'text-xs font-normal text-gray-500'}>
                        {data.from} to {data.to}
                      </span>
                    )}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Calendar
                      mode="range"
                      selected={{
                        from: stringToDate(data.from),
                        to: stringToDate(data.to),
                      }}
                      onSelect={(range) => {
                        updateParams({
                          from: dateToString(range?.from),
                          to: dateToString(range?.to),
                        });
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

//setSearchDrawerState(false);
//setAccordionItem('two');
export default MainSearchModal;
