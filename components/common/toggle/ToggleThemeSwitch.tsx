import React from 'react';
import styled, { css } from 'styled-components';
import IcoBrightness from '../ico/IcoBrightness';
import IcoSunny from '../ico/IcoSunny';

type ToggleThemeSwitchProps = {
  isDarkMode: boolean;
  onChangeTheme: () => void;
}

function ToggleThemeSwitch({ isDarkMode, onChangeTheme }: ToggleThemeSwitchProps) {

  const renderIcon = isDarkMode ?
    <IcoSunny width={18} height={18} color={'#FEDF4E'}/> :
    <IcoBrightness width={18} height={18} color={'#FEDF4E'}/>;
  return (
    <S.ToggleThemeSwitch isDarkMode={isDarkMode} onClick={onChangeTheme}>
      <div>
        {renderIcon}
      </div>
    </S.ToggleThemeSwitch>
  );
};

ToggleThemeSwitch.defaultProps = {
  isDarkMode: false,
} as ToggleThemeSwitchProps;

export default ToggleThemeSwitch;

const S: any = {};

S.ToggleThemeSwitch = styled.label`
  position: relative;
  display: inline-block;
  
  input {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      cursor: pointer;
  }
  
  div {
      height: 2.8rem;
      width: 4rem;
      padding:0 .5rem;
      position: relative;
      border-radius: 1.4rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      transition: linear .2s, background-color linear .2s;
      background-color: #0f1114;

      &:after {
        content: '';
        height: 2.4rem;
        width: 2.4rem;
        border-radius: 1.2rem;
        display: block;
        transition: linear .15s, background-color linear .15s;
        position: absolute;
        top: 0.2rem;
        left: 100%;
        margin-left: -2.6rem;
        cursor: pointer;
        box-shadow: -.2rem 0 .4rem 0 rgba(0, 0, 0, 0.2);
        background-color: #fff;
      }
    }
    
    ${props => props.isDarkMode && css`
      div {
        justify-content: flex-end;
    
        &:after {
          left: 2.8rem;
          background-color: #fff;
          border-radius: 1.2rem;
          box-shadow: .2rem 0 4px 0 rgba(0, 0, 0, 0.2);
        }
      }
    `}  
`;