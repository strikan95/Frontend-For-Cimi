'use client';

import React, { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { cn } from '@/lib/utils';

export type SearchBoxOptionType = {
  value: string;
};

type SearchBoxProps = {
  options: SearchBoxOptionType[];
  lastSelected?: number;
  handleSelection: (selectionIndex: number) => void;
};

function SearchBox({ options, lastSelected, handleSelection }: SearchBoxProps) {
  function handleOnChange(value: number) {
    console.log('setting last selected');
    handleSelection(value);
  }

  return (
    <Combobox value={lastSelected} onChange={(value) => handleOnChange(value)}>
      <SearchInput
        autoFocus
        displayValue={(item: number) => {
          return lastSelected !== -1 ? options[item].value : '';
        }}
        placeholder={'Find a location...'}
      />
      <div className={'flex flex-col'}>
        <Combobox.Options
          className={`max-h-64 w-full grow overflow-y-scroll rounded-lg rounded-t-none border border-t-0 border-gray-300 p-2`}
        >
          {options.map((option, index) => (
            <SearchItem className={'h-6'} key={index} value={index}>
              {option.value}
            </SearchItem>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}

const SearchInput = React.forwardRef<
  React.ElementRef<typeof Combobox.Input>,
  React.ComponentPropsWithoutRef<typeof Combobox.Input>
>(({ className, ...props }, ref) => (
  <Combobox.Input
    className={cn(
      className,
      `w-full rounded-lg rounded-b-none border border-b-0 border-gray-300 p-4 shadow-lg outline-none`
    )}
    {...props}
  />
));

const SearchItem = React.forwardRef<
  React.ElementRef<typeof Combobox.Option>,
  React.ComponentPropsWithoutRef<typeof Combobox.Option>
>(({ className, children, ...props }, ref) => (
  <Combobox.Option
    className={({ active }: { active: boolean }) =>
      cn('flex h-16 items-center rounded', active ? 'lg:bg-teal-600 lg:text-white' : 'lg:text-gray-900')
    }
    {...props}
  >
    {children}
  </Combobox.Option>
));

export default SearchBox;
