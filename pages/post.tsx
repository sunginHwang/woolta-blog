import React, { FC } from 'react';

import SideBar from '../components/layout/SideBar/SideBar';
import { IUserInfo } from '../models/user/IUserInfo';
import { ICategory } from '../models/post/ICategory';

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
    <SideBar isOpen={true}
             authInfo={userInfo}
             categories={categories}
             onClickCategoryPage={() => console.log(1)}
             onClickLogout={() => console.log(2)}
             onClickSideBarPage={() => console.log(3)}/>
  </div>
);

Home.getInitialProps = async () => {
  console.log('here');
  return {};
}
export default Home;
