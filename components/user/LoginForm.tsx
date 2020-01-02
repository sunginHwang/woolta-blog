import React from 'react';
import styled from 'styled-components';
import layouts from '../../style/layouts';
import colors from '../../style/colors';

type LoginViewProps = {
  id: string;
  password: string;
  onLogin: () => void;
  onChangeLoginForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LoginForm({
                     id,
                     password,
                     onLogin,
                     onChangeLoginForm,
                   }: LoginViewProps) {
  return (
    <S.LoginForm>
      <S.LoginTitle>
        로그인 후 포스팅 해봐요!
      </S.LoginTitle>
      <S.LoginInput>
        <input placeholder='Id'
               name='id'
               value={id}
               onChange={onChangeLoginForm}/>
        <input placeholder='Password'
               name='password'
               value={password}
               type='password'
               onChange={onChangeLoginForm}/>
      </S.LoginInput>
      <S.LoginButton onClick={onLogin}>Login</S.LoginButton>
    </S.LoginForm>
  );
};

LoginForm.defaultProps = {
  id: '',
  password: '',
} as LoginViewProps;

export default LoginForm;

const S: any = {};

S.LoginForm = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 9.6rem;
  margin-bottom: 48rem;

  @media screen and (max-width: ${layouts.mobileWidth}) {
    margin-top: 3.2rem;
  }

  @media screen and (max-width: ${layouts.mobileWidth}) {
    max-width: 100%;
  }
`;

S.LoginTitle = styled.div`
    color: ${colors.mainThemeColor};
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 3.2rem;

    @media screen and (max-width: ${layouts.mobileWidth}) {
      font-size: 2rem;
    }
`;

S.LoginInput = styled.div`
  width: 100%;
  max-width: 45rem;

  input {
    font-size: 2rem;
    width: 100%;
    height: 4.8rem;
    margin-bottom: 1.6rem;
    outline-style: none;
    color: ${colors.mainThemeColor};
    border: none;
    border-bottom: .2rem solid ${colors.bottomLineColor};

    @media screen and (max-width: ${layouts.mobileWidth}) {
      font-size: 1.5rem;
      width: 80%;
    }
  }
`;

S.LoginButton = styled.button`
  width: 100%;
  max-width: 45rem;
  margin-top: 3.2rem;
  font-size: 2rem;
  outline-style: none;
  border-radius: 3rem;
  height: 4.8rem;
  color: ${colors.mainThemeColor};
  border: .1rem solid ${colors.mainThemeColor};
  text-align: center;
  font-weight: bold;
  background-color: #fff !important;

  @media screen and (max-width: ${layouts.mobileWidth}) {
    margin-top: 2rem;
    width: 80%;
  }
`;