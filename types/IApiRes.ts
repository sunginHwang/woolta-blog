export interface IApiRes<T> {
  code: number;
  message: string;
  data: T;
}