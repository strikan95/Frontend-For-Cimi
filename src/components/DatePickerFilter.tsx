'use client';

import * as React from 'react';

import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { useState } from 'react';
import { addDays } from 'date-fns';

const pastMonth = new Date(2020, 10, 15);

function DatePickerFilter() {
  const defaultSelected: DateRange = {
    from: pastMonth,
    to: addDays(pastMonth, 4),
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      className="rounded-md border shadow"
    />
  );
}

export default DatePickerFilter;
