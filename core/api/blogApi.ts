import apiCall from '../util/apiCall';
import { BLOG_API } from '../constants';
import { ICategory } from '../../models/post/ICategory';
import IPosts from '../../models/post/IPosts';
import { IPost } from '../../models/post/IPost';


export const fetchCategories = () => {
  return apiCall.get<ICategory[]>(`${BLOG_API}/post/categories`);
};

export const fetchRecentPostList = () => {
  return apiCall.get<IPosts[]>(`${BLOG_API}/post/categories/new/posts`);
};

export const fetchPosts = (categoryNo) => {
  return apiCall.get<IPosts[]>(`${BLOG_API}/post/categories/${categoryNo}/posts`);
};


export const fetchPostInfo = (categoryNo, postNo) => {
  return apiCall.get<IPost>(`${BLOG_API}/post/categories/${categoryNo}/posts/${postNo}`);
};

export const delPost = (categoryNo, postNo) => {
  return apiCall.delete(`${BLOG_API}/post`, { data: { categoryNo, postNo } });
};



