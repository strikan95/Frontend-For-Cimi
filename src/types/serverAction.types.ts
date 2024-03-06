export type ServerActionResponse<T> = {
  error: string | null;
  result: T | null;
};
