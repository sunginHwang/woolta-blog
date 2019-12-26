import React, { useCallback } from 'react';
import { NextPageCustom } from '../types/next/NextPageCustom';
import LoginForm from '../components/user/LoginForm';
import { useDispatch } from 'react-redux';
import { login } from '../store/reducers/authReducer';
import { goMainPage } from '../core/utils/routeUtil';
import useTitle from '../core/hooks/useTitle';
import useInputs from '../core/hooks/useInputs';

const Login: NextPageCustom<{}> = ({}) => {

  const dispatch = useDispatch();
  useTitle('로그인');

  const [loginForm, onChange] = useInputs({ id: '', password: '' });

  const onLogin = useCallback(async () => {
    try {
      const {id, password} = loginForm;
      await dispatch(login({id, password}));
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
