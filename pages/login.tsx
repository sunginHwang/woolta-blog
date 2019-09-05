import React from 'react';
import { NextPageCustom } from '../models/next/NextPageCustom';
import LoginView from '../components/user/loginView/LoginView';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../models/redux/RootState';
import { changeLoginInput, login } from '../store/reducers/authReducer';
import { userLogin } from '../core/api/AuthApi';
import { bool } from 'prop-types';
import { goMainPage } from '../core/util/routeUtil';

interface LoginProps {
}

const Login: NextPageCustom<LoginProps> = ({}) => {

  const dispatch = useDispatch();
  const { id, password, authInfo } = useSelector((state: RootState) => state.authReducer);


  const onChangeLoginInfo = (inputType, value) => {

    dispatch(changeLoginInput({
      type: inputType,
      value: value,
    }));
  };

  // 로그인 클릭
  const onLoginClick = async () => {
    try {
      await dispatch(login(userLogin(id, password)));
      goMainPage();
    } catch (e) {
      alert('로그인 실패');
    }
  };

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
