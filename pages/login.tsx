import React, { useCallback } from 'react';
import { NextPageCustom } from '../types/next/NextPageCustom';
import LoginView from '../components/user/loginView/LoginView';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/redux/RootState';
import { changeLoginInput, login } from '../store/reducers/authReducer';
import { userLogin } from '../core/api/AuthApi';
import { goMainPage } from '../core/utils/routeUtil';
import useTitle from '../core/hooks/useTitle';

interface LoginProps {
}

const Login: NextPageCustom<LoginProps> = ({}) => {

  const dispatch = useDispatch();
  useTitle('로그인');
  console.log('로그인');
  const { id, password } = useSelector((state: RootState) => state.authReducer);

  const onChangeLoginInfo = useCallback((e:React.ChangeEvent<HTMLInputElement>) => dispatch(changeLoginInput({ type:e.target.name, value: e.target.value })),[]);

  // 로그인 클릭
  const onLoginClick = useCallback(async () => {
    try {
      await dispatch(login(userLogin(id, password)));
      goMainPage();
    } catch (e) {
      alert('로그인 실패');
    }
  },[id, password]);

  return (
    <LoginView id={id}
               password={password}
               onLoginClick={onLoginClick}
               onChangeLoginInfo={onChangeLoginInfo}/>
  );
};

Login.getInitialProps = async ({}) => {
  return {};
};

export default Login;
