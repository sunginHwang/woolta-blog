import apiCall from '../util/apiCall';
import { BLOG_API } from '../constants';
import { IUserInfo } from '../../models/user/IUserInfo';

export const userLogin =  (id: string, password: string) => {
  let data = new FormData();
  data.append('id',id);
  data.append('password',password);

  return apiCall.post<void>(`${BLOG_API}/user/login`,data);
};

export const fetchAuthInfo =  () => {
  return apiCall.get<IUserInfo>(`${BLOG_API}/user/check/jwt`);
};




