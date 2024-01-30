'use client';

import * as React from 'react';

import { Listbox } from '@headlessui/react';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

type TDate = {
  month: string;
  year: number;
};

export function Bla() {
  const [selectedDate, setSelectedDate] = useState<TDate>({
    month: 'Jun',
    year: 2024,
  });
  const [customOpen, setCustomOpen] = useState(true);

  function handleSelect(value: Partial<TDate>) {
    setSelectedDate((prevState) => {
      return { ...prevState, ...value };
    });
  }

  return (
    <div className={'flex flex-col gap-6 pt-2'}>
      <Listbox
        value={selectedDate}
        onChange={(value: Partial<TDate>) => handleSelect(value)}
      >
        {
          <>
            <Listbox.Button>{`${selectedDate.month}/${selectedDate.year}`}</Listbox.Button>
            {customOpen && (
              <div
                className={
                  'flex h-64 w-fit gap-2 overflow-hidden rounded border p-4'
                }
              >
                <Listbox.Options
                  className={'flex flex-col gap-6 overflow-auto pr-2'}
                  static
                >
                  {months.map((month, index) => (
                    <Listbox.Option
                      key={month}
                      value={{ month: month }}
                      className={({ active }) =>
                        cn(
                          'cursor-default select-none py-2 pl-10 pr-4',
                          active
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900'
                        )
                      }
                    >
                      {month}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>

                <Listbox.Options className={'overflow-auto pr-2'} static>
                  {Array.from({ length: 11 }, (_, index) => 2024 + index).map(
                    (year, index) => (
                      <Listbox.Option key={year} value={{ year: year }}>
                        {year}
                      </Listbox.Option>
                    )
                  )}
                </Listbox.Options>
              </div>
            )}
          </>
        }
      </Listbox>
    </div>
  );
}

const Options = (opts) => {
  return (
    <Listbox.Options
      className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base
        shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
    >
      {opts.map((opt, index) => (
        <Listbox.Option
          key={index}
          className={({ active }) =>
            cn(
              'relative cursor-default select-none py-2 pl-10 pr-4',
              active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
            )
          }
          value={opt}
        >
          {({ selected }) => (
            <>
              <span
                className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
              >
                {opt}
              </span>
              {selected ? (
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                  <Check className="h-5 w-5" aria-hidden="true" />
                </span>
              ) : null}
            </>
          )}
        </Listbox.Option>
      ))}
    </Listbox.Options>
  );
};
