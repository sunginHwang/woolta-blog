import { IWriter } from './IWriter';

export interface IPost {
  postNo: number;
  title: string;
  subDescription?: string;
  categoryLabel: string;
  categoryNo?: number;
  createdAt: string;
  authorNo?: string;
  author?: string;
  content: string;
  writer: IWriter;
}