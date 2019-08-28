import * as React from 'react';
import classNames from 'classnames/bind';
import { IUserInfo } from '../../../models/user/IUserInfo';
import { ICategory } from '../../../models/post/ICategory';
// @ts-ignore
import cn from './SideBar.scss';

const cx = classNames.bind(cn);

interface SideBarProps {
  isOpen: boolean,
  authInfo: IUserInfo,
  categories?: ICategory[],
  onClickLogout: any,
  onClickCategoryPage: any,
  onClickSideBarPage: any
}

const SideBar: React.FC<SideBarProps> = ({
                                           isOpen,
                                           authInfo,
                                           categories,
                                           onClickLogout,
                                           onClickCategoryPage,
                                           onClickSideBarPage,
                                         }) => {

  const renderCategories = categories.map((category) => {
    return <li key={category.value}>
      <a onClick={onClickCategoryPage(category.value)}>{category.label}</a>
    </li>;
  });

  const isLogin: boolean = authInfo.userId !== '';

  const userMenu =
    <li>
      <a>
        <img className={cn.userImage}
             src={authInfo.imageUrl}/>
        <span>{authInfo.userId}</span>
        <div className={cn.logoutArea}
             onClick={onClickLogout()}>로그아웃
        </div>
      </a>
    </li>;

  const nonUserMenu =
    <li>
      <a onClick={onClickSideBarPage('login')}>로그인</a>
    </li>;

  const renderPostWriteMenu = isLogin === true &&
    <li>
      <a onClick={onClickSideBarPage('postEdit')}>글쓰기 페이지 이동</a>
    </li>;

  return <div>
    <div className={cx(cn.sideBar, { sideBarOpen: isOpen })}>
      <ul>
        {isLogin ? userMenu : nonUserMenu}
        {renderPostWriteMenu}
        {renderCategories}
      </ul>
    </div>
    <div className={cx({ sideBarWhiteSpace: isOpen })}/>
  </div>;
};

export default SideBar;