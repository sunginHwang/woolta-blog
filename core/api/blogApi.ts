import apiCall from '../util/apiCall';
import { BLOG_API } from '../constants';
import { ICategory } from '../../models/post/ICategory';
import IPosts from '../../models/post/IPosts';


export const fetchCategories = () => {
  return apiCall.get<ICategory[]>(`${BLOG_API}/post/categories`);
};

export const fetchRecentPostList = () => {
  return apiCall.get<IPosts[]>(`${BLOG_API}/post/categories/new/posts`);
};
