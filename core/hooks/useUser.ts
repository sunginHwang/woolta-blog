import { useSelector } from 'react-redux';
import { ACCESS_TOKEN } from '../constants';
import Cookies from 'js-cookie';

import { useCallback } from 'react';
import { RootState } from '../../types/redux/RootState';

export default function useUser() {

  const {
    userInfo,
  } = useSelector((state: RootState) => ({ userInfo: state.authReducer.userInfo }));

  const checkUserInfo = useCallback(() => {
    userInfo.no <= 0 && Cookies.remove(ACCESS_TOKEN);
  }, [userInfo]);

  return [checkUserInfo] as [typeof checkUserInfo];
}