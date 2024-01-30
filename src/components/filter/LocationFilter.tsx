import React, { useEffect, useState } from 'react';
import SearchBox, { SearchBoxOptionType } from '@/components/SearchBox';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Combobox } from '@headlessui/react';
import { cn } from '@/lib/utils';

const places: SearchBoxOptionType[] = [
  { value: 'Osijek, Croatia' },
  { value: 'Zagreb, Croatia' },
  { value: 'Zadar, Croatia' },
  { value: 'Split, Croatia' },
  { value: 'Rijeka, Croatia' },
];

function LocationsFilter() {
  const [location, setLocation] = useState('');

  useEffect(() => console.log(`location is: ${location}`), [location]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button>Open Drawer</button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto flex h-[48rem] w-full max-w-md flex-col overflow-auto rounded-t-[10px] p-4">
          <DrawerHeader>
            <DrawerTitle>Where to?</DrawerTitle>
            <DrawerDescription>Select a location where you want to search listings.</DrawerDescription>
          </DrawerHeader>
          <div className={'flex-1 flex-col'}>
            <Combobox value={location} onChange={(value) => setLocation(value)}>
              <Combobox.Input
                autoFocus
                className={cn(
                  `w-full rounded-lg rounded-b-none border border-b-0 border-gray-300 p-4 shadow-lg outline-none`
                )}
                displayValue={(item: SearchBoxOptionType) => {
                  console.log(`item is: ${item}`);
                  return item.value;
                }}
                placeholder={'Find a location...'}
              />

              <div className={'flex flex-col'}>
                <Combobox.Options
                  className={`max-h-64 w-full grow overflow-y-scroll rounded-lg rounded-t-none border border-t-0 border-gray-300 p-2`}
                >
                  {places.map((place, index) => (
                    <Combobox.Option
                      className={({ active }: { active: boolean }) =>
                        cn(
                          'flex h-6 items-center rounded',
                          active ? 'lg:bg-teal-600 lg:text-white' : 'lg:text-gray-900'
                        )
                      }
                      value={place}
                    >
                      {place.value}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </div>
            </Combobox>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default LocationsFilter;
