'use client';

import React from 'react';
import { useFilter } from '@/lib/filter/useFilter';

function ClearAmenities() {
  const { data, updateParams } = useFilter();
  const [hidden, setHidden] = React.useState(true);

  React.useEffect(() => {
    if (data.amenities.length > 0) {
      return setHidden(false);
    }

    setHidden(true);
  });

  function handleClear() {
    updateParams({ amenities: [] });
  }

  return (
    <>
      {!hidden && (
        <button className={'text-gray-500 underline'} onClick={handleClear}>
          Clear
        </button>
      )}
    </>
  );
}

export default ClearAmenities;
