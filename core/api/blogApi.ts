import apiCall from '../utils/apiCall';
import { BLOG_API } from '../constants';
import { ICategory } from '../../types/post/ICategory';
import { IPost } from '../../types/post/IPost';


export const fetchCategories = () => {
  return apiCall.get<ICategory[]>(`${BLOG_API}/post/categories`);
};

export const fetchRecentPosts = () => {
  return apiCall.get<IPost[]>(`${BLOG_API}/post/categories/new/posts`);
};

export const fetchPosts = (categoryNo) => {
  return apiCall.get<IPost[]>(`${BLOG_API}/post/categories/${categoryNo}/posts`);
};


export const fetchPostInfo = ({categoryNo, postNo}) => {
  return apiCall.get<IPost>(`${BLOG_API}/post/categories/${categoryNo}/posts/${postNo}`);
};

export const delPost = ({categoryNo, postNo}) => {
  return apiCall.delete(`${BLOG_API}/post`, { data: { categoryNo, postNo } });
};

export const upsertPostApi = (postData) => {
  return apiCall.post(`${BLOG_API}/post`, postData);
};

