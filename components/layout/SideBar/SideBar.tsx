import * as React from 'react';
import classNames from 'classnames/bind';
import { IUserInfo } from '../../../types/user/IUserInfo';
import { ICategory } from '../../../types/post/ICategory';
import { goLoginPage, goPostEditPage, goPostListPage } from '../../../core/utils/routeUtil';
import cn from './SideBar.scss';

const cx = classNames.bind(cn);

interface SideBarProps {
  isOpen: boolean,
  userInfo: IUserInfo,
  categories?: ICategory[],
  onLogout: () => void,
  toggleSideBar: (toggle: boolean) => void;
}

const SideBar = ({
                   isOpen,
                   userInfo,
                   categories,
                   onLogout,
                   toggleSideBar,
                 }: SideBarProps) => {

  const onLoginClick = React.useCallback(() => {
    goLoginPage();
    toggleSideBar(false);
  }, []);

  const onPostEditClick = React.useCallback(() => {
    goPostEditPage();
    toggleSideBar(false);
  }, []);

  const isLogin: boolean = userInfo.userId !== '';

  const renderCategories = categories.map((category) => {

    // 카테고리 페이지 이동
    const goCategoryPage = React.useCallback(() => {
      goPostListPage(category.value);
      toggleSideBar(false);
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
        <img className={cn.userImage} src={userInfo.imageUrl}/>
        <span>{userInfo.userId}</span>
        <p className={cn.logout} onClick={onLogout}>로그아웃</p>
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
      <div className={cx(cn.sideBar, { sideBarOpen: isOpen })}>
        <ul>
          {isLogin ? renderUserMenu : renderNonUserMenu}
          {renderPostWriteMenu}
          {renderCategories}
        </ul>
      </div>
      <div className={cx({ sideBarWhiteSpace: isOpen })}/>
    </>
  );
};

export default SideBar;