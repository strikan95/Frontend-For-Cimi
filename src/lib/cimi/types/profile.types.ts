export type ApiProfile = {
  id: number;
  picture: string;
  email: string;
  roles: string[];
  userDetails: {
    firstName: string;
    lastName: string;
  };
};
