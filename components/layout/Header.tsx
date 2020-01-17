import React from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import { MdList } from 'react-icons/md';
import { goMainPage } from '../../core/utils/routeUtil';
import useToast from '../../core/hooks/useToast';
import colors from '../../style/colors';
import layouts from '../../style/layouts';


type HeaderProps = {
  showMobileHeader: boolean;
  showSideBar: boolean;
  toggleSideBar: (toggle: boolean) => void;

}

function Header({
                  showMobileHeader,
                  showSideBar,
                  toggleSideBar,
                }: HeaderProps) {
  const [, hideToast] = useToast();

  const onMainPageClick = React.useCallback(() => {
    goMainPage();
    toggleSideBar(false);
    hideToast();
  }, []);

  const onToggleSideBar = React.useCallback(() => toggleSideBar(!showSideBar), [showSideBar]);

  return (
    <>
      <S.GlobalStyle/>
      <S.Header isShowMobileHeader={showMobileHeader}>
        <S.HeaderLogo onClick={onMainPageClick}>woolta</S.HeaderLogo>
        <S.HeaderMenu onClick={onToggleSideBar}>
          <MdList/>
        </S.HeaderMenu>
      </S.Header>
    </>
  );
};

Header.defaultProps = {
  showMobileHeader: false,
  showSideBar: false,
} as HeaderProps;

export default Header;


const S: any = {};

S.Header = styled.div`
  position: fixed;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  background-color: ${props => props.theme.colors.headerColor};
  color: ${props => props.theme.colors.mainThemeColor};
  border-bottom-style: solid;
  height: ${layouts.mainHeaderHeight};
  border-color: ${props => props.theme.colors.customGrayColor};
  border-width: .1rem .1rem .2rem .1rem;

  @media screen and (max-width: ${layouts.mobileWidth}){
    transition: all .2s ease-in-out;
    ${props => props.isShowMobileHeader && css`
    top:-${layouts.mainHeaderHeight};
    border: none;
    `}
  }
  `;

S.HeaderLogo = styled.span`
  font-weight: bolder;
  font-size: 2rem;
  padding: 1.6rem;
  cursor: pointer;
`;

S.HeaderMenu = styled.span`
  cursor: pointer;
  font-size: 3rem;
  margin: 1.6rem;
`;

S.GlobalStyle = createGlobalStyle`
  body {
      background-color: ${props => props.theme.colors.whiteColor};
  }
  
  img{
      opacity: ${props => props.theme.colors.imgOpacity};;
  }
`;
