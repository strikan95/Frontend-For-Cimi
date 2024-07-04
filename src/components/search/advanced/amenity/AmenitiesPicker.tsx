'use client';

import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Amenities, Amenity } from '@/lib/cimi/types/listingData.types';
import { useFilter } from '@/lib/filter/useFilter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

function Item(props: { item: Amenity; onClick: () => void }) {
  const [selected, setSelected] = React.useState<boolean>(false);
  const { data } = useFilter();

  React.useEffect(() => {
    if (!data?.amenities?.includes(props.item.id.toString())) {
      setSelected(false);
      return;
    }
    setSelected(true);
  }, [data]);

  return (
    <li
      className={cn(
        'mr-4 flex justify-between rounded border px-2 py-1',
        selected ? 'border-blue-400' : 'border-gray-300'
      )}
      key={props.item.id}
    >
      <button
        className={'h-full w-full text-start'}
        onClick={() => props.onClick()}
      >
        {props.item.name}
      </button>
      {selected && <CheckIcon />}
    </li>
  );
}

function AmenitiesPicker(props: { amenities: Amenity[] }) {
  const { data, updateParams } = useFilter();

  function handleSelect(amenity: Amenity): void {
    let prevData = data.amenities as string[];
    const amenityId = amenity.id.toString();
    if (prevData?.includes(amenityId)) {
      prevData = prevData?.filter((item) => {
        return item !== amenityId;
      });
    } else {
      prevData?.push(amenityId);
    }
    updateParams({ amenities: prevData });
  }

  return (
    <ScrollArea type={'always'} className={'h-48'}>
      <ul className={'flex flex-col gap-2'}>
        {props.amenities.map((item, index) => (
          <Item key={item.id} item={item} onClick={() => handleSelect(item)} />
        ))}
      </ul>
    </ScrollArea>
  );
}

export default AmenitiesPicker;
