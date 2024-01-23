'use server';

export type MapBoxSearchResponse = {
  suggestions: MapBoxSuggestionType[];
};

export type MapBoxSuggestionType = {
  name: string;
  place_formatted: string;
  mapbox_id: string;
};

export type MapBoxLocationDetails = {
  features: [
    {
      geometry: {
        coordinates: [string, string];
      };
      properties: {
        name: string;
        place_formatted: string;
      };
    },
  ];
};

export async function getLocationSuggestions(query: string) {
  const session_token: string = '03cfb233-e02b-4b08-818d-318bf4c30851';
  const access_token: string =
    'pk.eyJ1IjoiZ29zdG96byIsImEiOiJjbGt2NWFhcXQwNXZiM3BtejUzaW15cWN5In0.ljDeA9mdeOZUOsZkbnr2dQ';
  try {
    const res = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}&language=en&types=city&session_token=${session_token}&access_token=${access_token}`
    );

    if (!res.ok) {
      throw new Error('Error while fetching suggestions');
    }

    const data: MapBoxSearchResponse = await res.json();
    return [...data.suggestions];
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
      throw new Error('Error while fetching suggestion details');
    }

    const data: MapBoxLocationDetails = await res.json();

    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
