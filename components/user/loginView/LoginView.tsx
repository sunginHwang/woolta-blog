import React from 'react';
import * as cn from './LoginView.scss';

interface LoginViewProps {
  id: string;
  password: string;
  onLoginClick: () => void;
  onChangeLoginInfo: (type: string, value: string) => void;
}

const LoginView: React.FC<LoginViewProps> = ({
                                               id,
                                               password,
                                               onLoginClick,
                                               onChangeLoginInfo,
                                             }) => (
  <div className={cn.login}>
    <div className={cn.login__title}>
      로그인 후 포스팅 해봐요!
    </div>
    <div className={cn.login__input}>
      <input placeholder='Id'
             value={id}
             onChange={(e) => onChangeLoginInfo('id', e.target.value)}/>
      <input placeholder='Password'
             value={password}
             type='password'
             onChange={(e) => onChangeLoginInfo('password', e.target.value)}/>
    </div>
    <button
      className={cn.login__button}
      onClick={() => onLoginClick()}>Login
    </button>
  </div>
);

export default LoginView;
