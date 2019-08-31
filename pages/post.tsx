import React from 'react';
import { IUserInfo } from '../models/user/IUserInfo';
import { ICategory } from '../models/post/ICategory';
import { goMainPage } from '../core/util/routeUtil';

const userInfo: IUserInfo = {
  userId: 'gommpo',
  no: 0,
  imageUrl: '',
  authToken: '',
};

const categories: ICategory[] = [{
  value: 12,
  label: '12',
}];

const Home = () => (
  <div>
    <p onClick={()=> goMainPage()}>go main page</p>
  </div>
);

Home.getInitialProps = async () => {
  console.log('here');
  return {};
};
export default Home;
