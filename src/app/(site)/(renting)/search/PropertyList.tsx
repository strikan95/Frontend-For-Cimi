import React from 'react';
import { QueryParams, searchListings } from '@/lib/cimi/api/search';
import Scroller from '@/app/(site)/(renting)/search/Scroller';

async function PropertyList({ params }: { params: Partial<QueryParams> }) {
  const data = await searchListings(params, 0);

  if (data.error || !data.result) {
    return <div>{data.error}</div>;
  }

  const results = data.result;

  return <Scroller params={params} initialData={results} />;
}

export default PropertyList;
