'use client';

import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';

type DisabledRange = {
  from: Date;
  to: Date;
};

function AvailabilityCalendar({
  disabled,
}: {
  disabled: { startDate: string; endDate: string }[];
}) {
  const [matches, setMatches] = useState(
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 768px)').matches
      : undefined
  );

  useEffect(() => {
    window
      .matchMedia('(min-width: 640px)')
      .addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  const disabledDays: DisabledRange[] = disabled.reduce(
    (acc: DisabledRange[], item) => {
      return [
        ...acc,
        { from: new Date(item.startDate), to: new Date(item.endDate) },
      ];
    },
    []
  );

  return (
    <div className={'flex flex-wrap-reverse justify-start gap-4'}>
      <div className={'mx-auto w-fit md:mx-0'}>
        <Calendar
          numberOfMonths={matches ? 2 : 1}
          pagedNavigation
          mode="range"
          showOutsideDays
          fixedWeeks
          disabled={disabled.reduce((acc: DisabledRange[], item) => {
            return [
              ...acc,
              { from: new Date(item.startDate), to: new Date(item.endDate) },
            ];
          }, [])}
          modifiersStyles={{ disabled: { color: 'red' } }}
          fromMonth={new Date('today')}
        />
      </div>
    </div>
  );
}

export default AvailabilityCalendar;
