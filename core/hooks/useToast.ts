import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { closeToast, openToast } from '../../store/reducers/layoutReducer';

export default function useToast() {
  const dispatch = useDispatch();

  const showToast = useCallback((message) => {
    dispatch(openToast(message));
  }, [dispatch]);

  const hideToast = useCallback(() => {
    dispatch(closeToast());
  }, [dispatch]);

  const notifyToast = useCallback((message) => {
    showToast(message);
    setTimeout(() => hideToast(), 2000);
  }, [dispatch]);


  return [showToast, hideToast, notifyToast] as [typeof showToast, typeof hideToast, typeof notifyToast];
}