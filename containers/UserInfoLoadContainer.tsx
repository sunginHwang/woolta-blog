import React, { useEffect } from 'react';
import { ACCESS_TOKEN } from '../core/constants';
import { useDispatch } from 'react-redux';
import { loadUserInfo } from '../store/reducers/authReducer';

const UserInfoLoadContainer: React.FC<{}> = () => {

  const dispatch = useDispatch();

  const checkUserInfo = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    accessToken && dispatch(loadUserInfo());
  };

  useEffect(checkUserInfo, []);

  return null;
};

export default React.memo(UserInfoLoadContainer);