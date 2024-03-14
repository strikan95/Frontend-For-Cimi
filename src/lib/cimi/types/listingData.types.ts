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

type ListingSearchItem = {
  id: number;
  title: string;
  coverImageUrl: string;
};

export type Listing = {
  id: number;
  title: string;
  description: string;
  coverImageUrl: string;
  structureType: { name: string; iconUrl: string };
  images: { id: string; thumbnailUrl: string }[];
  amenities: { name: string; iconUrl: string }[];
  rentPeriods: { startDate: string; endDate: string }[];
  status: 'approved' | 'draft' | 'pending';
};
