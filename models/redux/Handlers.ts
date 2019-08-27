export type Handlers<T> = {
  [type: string]: (state: T, action: any) => T;
};
