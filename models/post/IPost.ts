import { IWriter } from './IWriter';

export interface IPost {
  postNo: number;
  title: string;
  subDescription: string;
  categoryLabel: string;
  categoryNo: number;
  createdAt: string;
  author: string;
  content: string;
  writer: IWriter;
}