import React from 'react';
import { Combobox } from '@headlessui/react';
import { cn } from '@/lib/utils';

const places = [
  'Osijek, Croatia',
  'Zagreb, Croatia',
  'Zadar, Croatia',
  'Split, Croatia',
  'Rijeka, Croatia',
];

function SearchBox() {
  return (
    <Combobox>
      <Combobox.Input
        className={`w-full rounded-lg rounded-b-none border border-b-0 border-gray-300 p-2 shadow-lg
          outline-none`}
        placeholder={'Find a location...'}
      />
      <Combobox.Options
        className={`max-h-32 w-full overflow-y-scroll rounded-lg rounded-t-none border border-t-0
          border-gray-300 p-2`}
      >
        {places.map((place, index) => (
          <SearchItem className={'h-8'} value={index}>
            {place}
          </SearchItem>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}

const SearchItem = React.forwardRef<
  React.ElementRef<typeof Combobox.Option>,
  React.ComponentPropsWithoutRef<typeof Combobox.Option>
>(({ className, children, ...props }, ref) => (
  <Combobox.Option
    className={({ active }) =>
      cn(
        'flex h-16 items-center rounded',
        active ? 'bg-teal-600 text-white' : 'text-gray-900'
      )
    }
    {...props}
  >
    {children}
  </Combobox.Option>
));

export default SearchBox;
