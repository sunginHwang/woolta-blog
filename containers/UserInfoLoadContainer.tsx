import React, { useEffect } from 'react';
import { ACCESS_TOKEN } from '../core/constants';
import { useDispatch } from 'react-redux';
import { loaduserInfo } from '../store/reducers/authReducer';
import { fetchUserInfo } from '../core/api/AuthApi';

const UserInfoLoadContainer: React.FC<{}> = () => {

  const dispatch = useDispatch();

  const checkUserInfo = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    accessToken && dispatch(loaduserInfo(fetchUserInfo()));
  };

  useEffect(checkUserInfo,[]);

 return null;
};

export default React.memo(UserInfoLoadContainer);