import React, { useEffect } from 'react';
import { ACCESS_TOKEN } from '../../core/constants';
import { useDispatch } from 'react-redux';
import { loadAuthInfo } from '../../store/reducers/authReducer';
import { fetchAuthInfo } from '../../core/api/AuthApi';

const UserInfoLoadContainer: React.FC<{}> = () => {

  const dispatch = useDispatch();

  const checkUserInfo = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    accessToken && dispatch(loadAuthInfo(fetchAuthInfo()));
  };

  useEffect(checkUserInfo,[]);

 return null;
};

export default UserInfoLoadContainer;