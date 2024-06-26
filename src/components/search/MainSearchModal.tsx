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

function MainSearchModal() {
  const [accordionItem, setAccordionItem] = useState('one');
  const [searchDrawerState, setSearchDrawerState] = useState<boolean>(false);

  const [modalState, setModalState] = useState<boolean | undefined>(undefined);

  const { data, handleSearch, clearParams, updateParams } = useFilter();

  function dateToString(date?: Date) {
    if (!date) return undefined;
    return format(date, 'yyyy-MM-dd');
  }
  function stringToDate(str?: string) {
    if (!str) return undefined;
    return parse(str, 'yyyy-MM-dd', new Date());
  }

  return (
    <Dialog.Root open={modalState} onOpenChange={setModalState}>
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
      <Dialog.Portal>
        <Dialog.Overlay
          className={`fixed inset-0 z-30 bg-black/80 data-[state=open]:animate-in
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0
            data-[state=open]:fade-in-0`}
        />
        <Dialog.Content
          className="fixed left-0 top-0 z-40 h-full w-full bg-gray-100 p-2 md:left-[50%] md:top-[50%]
            md:aspect-square md:h-fit md:max-h-fit md:max-w-lg md:translate-x-[-50%]
            md:translate-y-[-50%] md:rounded-lg md:pb-16"
        >
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
                              const lat =
                                feature.properties.coordinates.latitude.toString();
                              const lon =
                                feature.properties.coordinates.longitude.toString();
                              updateParams({
                                lat: lat,
                                lon: lon,
                                poi: lat + ',' + lon,
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
                  <AccordionContent className={'flex justify-center'}>
                    <Calendar
                      showOutsideDays
                      fixedWeeks
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
          <div className={'fixed bottom-6 right-6 flex gap-4'}>
            <Button onClick={clearParams}>Clear</Button>
            <Button
              onClick={() => {
                handleSearch();
                setModalState(false);
              }}
            >
              Search
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

//setSearchDrawerState(false);
//setAccordionItem('two');
export default MainSearchModal;
