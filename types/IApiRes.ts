export interface IApiRes<T = any> {
  code: number;
  message: string;
  data: T;
}