'use server';

import type {
  SearchBoxSuggestionResponse,
  SearchBoxFeatureSuggestion,
} from '@mapbox/search-js-core';

export async function getLocationSuggestions(query: string) {
  const session_token: string = '03cfb233-e02b-4b08-818d-318bf4c30851';
  const access_token: string =
    'pk.eyJ1IjoiZ29zdG96byIsImEiOiJjbGt2NWFhcXQwNXZiM3BtejUzaW15cWN5In0.ljDeA9mdeOZUOsZkbnr2dQ';
  try {
    const res = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}&language=en&types=city&session_token=${session_token}&access_token=${access_token}`
    );

    if (!res.ok) {
      console.error(await res.json());
      return [];
    }

    const SBResponse: SearchBoxSuggestionResponse = await res.json();
    return [...SBResponse.suggestions];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getLocationDetails(id: string) {
  const session_token: string = '03cfb233-e02b-4b08-818d-318bf4c30851';
  const access_token: string =
    'pk.eyJ1IjoiZ29zdG96byIsImEiOiJjbGt2NWFhcXQwNXZiM3BtejUzaW15cWN5In0.ljDeA9mdeOZUOsZkbnr2dQ';
  try {
    const res = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${id}?session_token=${session_token}&access_token=${access_token}`
    );

    if (!res.ok) {
      console.error(await res.json());
      return null;
    }

    const data = await res.json();
    const features: SearchBoxFeatureSuggestion[] = data.features;

    return features[0];
  } catch (e) {
    console.error(e);
    return null;
  }
}
