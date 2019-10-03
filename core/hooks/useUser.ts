import { useDispatch } from 'react-redux';
import { ACCESS_TOKEN } from '../constants';
import { loadUserInfo } from '../../store/reducers/authReducer';
import { useCallback } from 'react';

export default function useUser() {
  const dispatch = useDispatch();

  const checkUserInfo = useCallback(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    accessToken && dispatch(loadUserInfo());
  }, [dispatch]);

  return [checkUserInfo] as [typeof checkUserInfo];
}