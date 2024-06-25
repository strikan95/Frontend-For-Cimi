'use client';

import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Amenity } from '@/lib/cimi/types/listingData.types';
import { useFilter } from '@/lib/filter/useFilter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

function Item(props: {
  item: string;
  handleSelect: (item: string) => void;
  handleClear?: () => void;
}) {
  const [selected, setSelected] = React.useState<boolean>(false);
  const { data } = useFilter();

  React.useEffect(() => {
    if (data.amenities.includes(props.item)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [data.amenities]);

  return (
    <li
      className={cn(
        'mr-4 flex justify-between rounded border px-2 py-1',
        selected ? 'border-blue-400' : 'border-gray-300'
      )}
      key={props.item}
    >
      <button
        className={'h-full w-full text-start'}
        onClick={() => props.handleSelect(props.item)}
      >
        {props.item}
      </button>
      {selected && <CheckIcon />}
    </li>
  );
}

function AmenitiesPicker(props: { amenities: Amenity[] }) {
  const { data, updateParams } = useFilter();

  function handleSelect(amenity: string): void {
    const prevState = data.amenities;
    if (prevState?.includes(amenity)) {
      const newState = prevState?.filter((item) => {
        return item !== amenity;
      });

      updateParams({ amenities: [...newState] });
      return;
    }

    updateParams({ amenities: [...prevState, amenity] });
  }

  return (
    <ScrollArea type={'always'} className={'h-48'}>
      <ul className={'flex flex-col gap-2'}>
        {props.amenities.map((item, index) => (
          <Item key={index} item={item.name} handleSelect={handleSelect} />
        ))}
      </ul>
    </ScrollArea>
  );
}

export default AmenitiesPicker;
