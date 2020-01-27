import React from 'react';
import styled from 'styled-components';
import layouts from '../../style/layouts';

type ThemeHeaderProps = {
  children: React.ReactNode;
}

function ThemeHeader({children}: ThemeHeaderProps) {

  return (
    <S.ThemeHeader>
      {children}
    </S.ThemeHeader>
  );
};

ThemeHeader.defaultProps = {} as ThemeHeaderProps;

export default ThemeHeader;

const S: any = {};

S.ThemeHeader = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: flex-end;
  
  @media screen and (max-width: ${layouts.mobileWidth}) {
    padding : 0 2rem;
  }
`;