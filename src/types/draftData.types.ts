export type DraftLocation = {
  country?: string;
  city?: string;
  postCode?: string;
  street?: string;
  streetNumber?: string;
  latitude?: number;
  longitude?: number;
};

export type DraftStructureType = {
  id: number;
  name: string;
};

export type DraftAmenity = {
  id: number;
  name: string;
};

export type DraftImage = {
  id: string;
  thumbnailUrl: string;
};

export type Draft = {
  id: string;
  lastUpdatedStep: string;
  title?: string;
  description?: string;
  structureType?: DraftStructureType;
  amenities: DraftAmenity[];
  location?: DraftLocation;
  images: DraftImage[];
};
