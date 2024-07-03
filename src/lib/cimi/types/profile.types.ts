export type CimiApiProfile = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  roles: string[];
};

export type CimiUpdateProfileDto = {
  firstName: string;
  lastName: string;
};
