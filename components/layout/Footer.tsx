import React from 'react';
import styled from 'styled-components';
import layouts from '../../style/layouts';
import colors from '../../style/colors';

type FooterProps = {
  editMode: boolean;
}

function Footer({ editMode }: FooterProps) {

  if (editMode) return null;

  return (
    <S.Footer>
      <p>Copyright © 2018 woolta.com</p>
      <p>gommpo111@gmail.com</p>
    </S.Footer>
  );
};

Footer.defaultProps = {
  editMode: false,
} as FooterProps;

export default Footer;

const S: any = {};

S.Footer = styled.div`
  height: ${layouts.mainFooterHeight};
  display: flex;
  flex-direction: column;
  align-items: center;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.whiteColor};
  border-top: .1rem solid ${props => props.theme.colors.customGrayColor};
  color: ${props => props.theme.colors.mainThemeColor};
  text-align: center;
  padding-top: 1.6rem;
  
  P{
    font-size: 1.4rem;
    margin-bottom: 1.6rem;
  }
`;

