import React, { useCallback } from 'react';
import { NextPageCustom } from '../types/next/NextPageCustom';
import LoginForm from '../components/user/loginForm/LoginForm';
import { useDispatch } from 'react-redux';
import { login } from '../store/reducers/authReducer';
import { userLogin } from '../core/api/AuthApi';
import { goMainPage } from '../core/utils/routeUtil';
import useTitle from '../core/hooks/useTitle';
import useInputs from '../core/hooks/useInputs';

interface LoginProps {
}

const Login: NextPageCustom<LoginProps> = ({}) => {

  const dispatch = useDispatch();
  useTitle('로그인');

  const [loginForm, onChange] = useInputs({ id: '', password: '' });

  const onLogin = useCallback(async () => {
    try {
      await dispatch(login(userLogin(loginForm.id, loginForm.password)));
      goMainPage();
    } catch (e) {
      alert('로그인 실패');
    }
  }, [loginForm]);

  return (
    <LoginForm id={loginForm.id}
               password={loginForm.password}
               onLogin={onLogin}
               onChangeLoginForm={onChange}/>
  );
};

Login.getInitialProps = async ({}) => {
  return {};
};

export default React.memo(Login);
