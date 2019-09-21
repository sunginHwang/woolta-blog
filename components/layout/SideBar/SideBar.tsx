import * as React from 'react';
import classNames from 'classnames/bind';
import { IUserInfo } from '../../../types/user/IUserInfo';
import { ICategory } from '../../../types/post/ICategory';
import cn from './SideBar.scss';
import { goLoginPage, goPostEditPage, goPostListPage } from '../../../core/utils/routeUtil';

const cx = classNames.bind(cn);

interface SideBarProps {
  isOpen: boolean,
  userInfo: IUserInfo,
  categories?: ICategory[],
  onClickLogout: () => void,
  toggleSideBar: (toggle: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({
                                           isOpen,
                                           userInfo,
                                           categories,
                                           onClickLogout,
                                           toggleSideBar,
                                         }) => {

  const onLoginClick = React.useCallback(() => {
    goLoginPage();
    toggleSideBar(false);
  }, []);

  const onPostEditClick = React.useCallback(() => {
    goPostEditPage();
    toggleSideBar(false);
  }, []);

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

  const goLogout = React.useCallback(() => onClickLogout(), []);

  const renderUserMenu =
    <li>
      <a>
        <img className={cn.userImage} src={userInfo.imageUrl}/>
        <span>{userInfo.userId}</span>
        <p className={cn.logout} onClick={goLogout}>로그아웃</p>
      </a>
    </li>;


  const renderNonUserMenu =
    <li>
      <a onClick={onLoginClick}>로그인</a>
    </li>;

  const isLogin: boolean = userInfo.userId !== '';

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