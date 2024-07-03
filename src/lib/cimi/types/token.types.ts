export type CimiLoginResponse = {
  token: string;
  profile: CimiUserProfile;
};

export type CimiUserProfile = {
  id: number;
  roles: string[];
  first_name: string;
  last_name: string;
  email: string;
  picture: string;
};

export type CimiJWTToken = {
  iat: number;
  exp: number;
  roles: string[];
  username: string;
};
