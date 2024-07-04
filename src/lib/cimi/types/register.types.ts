export type TCimiUserRole = 'ROLE_STUDENT' | 'ROLE_HOST';

export type RegisterUserDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: TCimiUserRole;
};
