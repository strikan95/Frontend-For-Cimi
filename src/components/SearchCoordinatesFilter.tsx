'use client';

import React, { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getLocationDetails,
  getLocationSuggestions,
  MapBoxSuggestionType,
} from '@/app/search/actions';

type LocationSearchFilterParams = {
  lat: string;
  lon: string;
};

type LocationSearchBoxProps = LocationSearchFilterParams & {
  updateParams: (params: Partial<LocationSearchFilterParams>) => void;
};

export default function SearchCoordinatesFilter({
  lat,
  lon,
  updateParams,
}: LocationSearchBoxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<MapBoxSuggestionType[] | []>(
    []
  );

  React.useEffect(() => {
    if (query === '') {
      return;
    }

    getLocationSuggestions(encodeURIComponent(query))
      .then((res) => {
        setSuggestions(res);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [query]);

  React.useEffect(() => {
    if (selectedIndex === -1) {
      return;
    }

    getLocationDetails(suggestions[selectedIndex].mapbox_id)
      .then((res) => {
        updateParams({
          lat: res?.features[0].geometry.coordinates[0],
          lon: res?.features[0].geometry.coordinates[1],
        });
      })
      .catch((error) => console.error(error));
  }, [selectedIndex]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="fixed top-16 w-72">
        <Combobox value={selectedIndex} onChange={setSelectedIndex}>
          <div className="relative mt-1">
            <div
              className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left
                shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75
                focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
            >
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                displayValue={() =>
                  selectedIndex !== -1
                    ? `${suggestions[selectedIndex].name}, ${suggestions[selectedIndex].place_formatted}`
                    : ''
                }
                placeholder={'Search for a place...'}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronsUpDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base
                  shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
              >
                {suggestions.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  suggestions.map((suggestion: MapBoxSuggestionType, index) => (
                    <Combobox.Option
                      key={index}
                      className={({ active }) =>
                        cn(
                          'relative cursor-default select-none py-2 pl-10 pr-4',
                          active ? 'bg-teal-600 text-white' : 'text-gray-900'
                        )
                      }
                      value={index}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                          >
                            {`${suggestion.name}, ${suggestion.place_formatted}`}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-teal-600'
                              }`}
                            >
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </main>
  );
}
