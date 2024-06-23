import React from 'react';
import { Amenity } from '@/lib/cimi/types/listingData.types';
import AmenitiesPicker from '@/components/search/advanced/amenity/AmenitiesPicker';
import ClearAmenities from '@/components/search/advanced/amenity/ClearAmenities';

async function getAmenities(): Promise<Amenity[]> {
  const res = await fetch(`http://localhost:8080/api/v1/amenities`);
  const data = await res.json();

  return data.amenities;
}

async function AmenitiesFilter() {
  const amenities = await getAmenities();
  return (
    <div>
      <div className={'flex w-full justify-between pb-2'}>
        <h1 className={'text-xl font-bold'}>Filter by Amenities</h1>
        <ClearAmenities />
      </div>
      <AmenitiesPicker amenities={amenities} />
    </div>
  );
}

export default AmenitiesFilter;
