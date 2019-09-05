import apiCall from '../util/apiCall';
import { BLOG_API } from '../constants';

export const userLogin =  (id: string, password: string) => {
  let data = new FormData();
  data.append('id',id);
  data.append('password',password);

  return apiCall.post<void>(`${BLOG_API}/user/login`,data);
};



