import React from 'react';
import * as cn from './LoginForm.scss';

interface LoginViewProps {
  id: string;
  password: string;
  onLogin: () => void;
  onChangeLoginForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm = ({
                     id,
                     password,
                     onLogin,
                     onChangeLoginForm,
                   }: LoginViewProps) => (
  <div className={cn.login}>
    <div className={cn.login__title}>
      로그인 후 포스팅 해봐요!
    </div>
    <div className={cn.login__input}>
      <input placeholder='Id'
             name='id'
             value={id}
             onChange={onChangeLoginForm}/>
      <input placeholder='Password'
             name='password'
             value={password}
             type='password'
             onChange={onChangeLoginForm}/>
    </div>
    <button
      className={cn.login__button}
      onClick={onLogin}>Login
    </button>
  </div>
);

export default LoginForm;
