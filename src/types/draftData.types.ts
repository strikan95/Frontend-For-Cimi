export type StructureType = {
  id: number;
  name: string;
  iconUrl: string;
};

export type StructureTypes = {
  options: StructureType[];
};

export type Amenity = {
  id: number;
  name: string;
  iconUrl: string;
};

export type Image = {
  id: string;
  url: string;
  thumbnailUrl: string;
};

export type Draft = {
  id?: string;
  lastUpdatedStep?: string;
  title?: string;
  description?: string;
  structureType?: string | StructureType;
  amenities: string[] | Amenity[];
  location?: {
    country?: string;
    city?: string;
    postCode?: string;
    street?: string;
    streetNumber?: string;
    latitude?: number;
    longitude?: number;
  };
  images: Image[];
};
