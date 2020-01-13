import React, { useCallback } from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import layouts from '../../style/layouts';
import { IUserInfo } from '../../types/user/IUserInfo';
import { ICategory } from '../../types/post/ICategory';
import { goLoginPage, goPostEditPage, goPostListPage } from '../../core/utils/routeUtil';
import useToast from '../../core/hooks/useToast';


type SideBarProps = {
  isOpen: boolean,
  userInfo: IUserInfo,
  categories?: ICategory[],
  onLogout: () => void,
  toggleSideBar: (toggle: boolean) => void;
}

function SideBar({
                   isOpen,
                   userInfo,
                   categories,
                   onLogout,
                   toggleSideBar,
                 }: SideBarProps) {

  const [, hideToast] = useToast();

  const clearSideMenu = useCallback(() => {
    toggleSideBar(false);
    hideToast();
  }, []);

  const onLoginClick = useCallback(() => {
    goLoginPage();
    clearSideMenu();
  }, []);

  const onPostEditClick = useCallback(() => {
    goPostEditPage();
    clearSideMenu();
  }, []);

  const isLogin: boolean = userInfo.userId !== '';

  const renderCategories = categories.map(category => {

    // 카테고리 페이지 이동
    const goCategoryPage = useCallback(() => {
      goPostListPage(category.value);
      clearSideMenu();
    }, [category.value]);

    return (
      <li key={category.value}>
        <a onClick={goCategoryPage}>{category.label}</a>
      </li>
    );
  });

  const renderUserMenu =
    <li>
      <a>
        <S.UserImage src={userInfo.imageUrl}/>
        <span>{userInfo.userId}</span>
        <S.Logout onClick={onLogout}>로그아웃</S.Logout>
      </a>
    </li>;

  const renderNonUserMenu =
    <li>
      <a onClick={onLoginClick}>로그인</a>
    </li>;

  const renderPostWriteMenu = isLogin === true &&
    <li>
      <a onClick={onPostEditClick}>글쓰기 페이지 이동</a>
    </li>;

  return (
    <>
      <S.SideBar isSideBarOpen={isOpen}>
        <ul>
          {isLogin ? renderUserMenu : renderNonUserMenu}
          {renderPostWriteMenu}
          {renderCategories}
        </ul>
      </S.SideBar>
      {isOpen && <S.SideBarWhiteSpace/>}
    </>
  );
};

SideBar.defaultProps = {
  isOpen: false,
  userInfo: {
    no: 0,
    userId: '',
  },
  categories: [],
} as SideBarProps;

export default SideBar;

const S: any = {};

S.SideBar = styled.div`
  border: .1rem solid ${props => props.theme.colors.customGrayColor};
  width: ${layouts.mainRightWidth};
  height: 100%;
  position: fixed;
  font-size: 1.6rem;
  z-index: ${layouts.sideBarZIndex * 2};
  background-color: ${props => props.theme.colors.whiteColor};
  top: ${layouts.mainHeaderHeight};

  right: ${props => props.isSideBarOpen ? 0 : `-${layouts.mainRightWidth}`};
  transition: all .1s ease;

  ul{
    margin-top: 3.2rem !important;

    li{
      a{
        text-align: left;
        display: block;
        text-decoration: none;
        padding: 1.6rem;
        border-left: .2px solid transparent;
        font-weight: 400;
        color: ${props => props.theme.colors.mainThemeColor};
        cursor: pointer;
      }

      &:hover{
        color: ${props => props.theme.colors.mainThemeColor};
        background-color: ${props => props.theme.colors.customGrayColor};
      }
    }
  }
  `;

S.Logout = styled.p`
  cursor: pointer;
  float:right;
`;

S.UserImage = styled.img`
  float: left;
  width: 2.5rem;
  margin-right: 1rem;
  border-radius: 50%;
  height: 100%;
  vertical-align: middle;
`;

S.SideBarWhiteSpace = styled.div`
  background-color: ${props => props.theme.colors.SideBarSpaceColor};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: ${layouts.sideBarZIndex}
`;


