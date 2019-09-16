import React, { useCallback } from 'react';
import * as cn from './LoginView.scss';

interface LoginViewProps {
  id: string;
  password: string;
  onLoginClick: () => void;
  onChangeLoginInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginView: React.FC<LoginViewProps> = ({
                                               id,
                                               password,
                                               onLoginClick,
                                               onChangeLoginInfo,
                                             }) => {

  console.log('login View');

  return (
    <div className={cn.login}>
      <div className={cn.login__title}>
        로그인 후 포스팅 해봐요!
      </div>
      <div className={cn.login__input}>
        <input placeholder='Id'
               name='id'
               value={id}
               onChange={onChangeLoginInfo}/>
        <input placeholder='Password'
               name='password'
               value={password}
               type='password'
               onChange={onChangeLoginInfo}/>
      </div>
      <button
        className={cn.login__button}
        onClick={onLoginClick}>Login
      </button>
    </div>
  );
};

export default LoginView;
