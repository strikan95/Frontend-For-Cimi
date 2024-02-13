export type StructureType = {
  id: number;
  name: string;
  iconUrl: string;
};

export type StructureTypes = {
  options: StructureType[];
};

export type Draft = {
  id?: string;
  lastUpdatedStep?: string;
  title?: string;
  description?: string;
  structureType?: { id: number };
  location?: {
    country?: string;
    city?: string;
    zipCode?: number;
    street?: string;
    streetNumber?: string;
  };
};
