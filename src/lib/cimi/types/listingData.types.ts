export type Amenity = {
  id: number;
  name: string;
  iconUrl: string;
};

export type StructureType = {
  id: number;
  name: string;
  iconUrl: string;
};

export type Amenities = {
  name: string;
  iconUrl: string;
};

export type Listing = {
  id: number;
  title: string;
  description: string;
  coverImageUrl: string;
  structureType: { name: string; iconUrl: string };
  images: { id: string; thumbnailUrl: string }[];
  amenities: Amenities[];
  rentPeriods: { startDate: string; endDate: string }[];
  status: 'approved' | 'draft' | 'pending';
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  host: { id: string };
};
