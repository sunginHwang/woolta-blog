import * as React from 'react';
import classNames from 'classnames/bind';
import { MdList } from 'react-icons/md';

// @ts-ignore
import cn from './Header.scss';

const cx = classNames.bind(cn);

interface IHeaderProps{
  onClickSideBar: any,
  onClickLogo: any,
  showMobileHeader: boolean
}

const Header: React.FC<IHeaderProps> = ({
                                         onClickSideBar,
                                         onClickLogo,
                                         showMobileHeader,
                                       }) => (
  <div className={cx(cn.mainHeader, { hideHeaderMobile: showMobileHeader })}>
    <div className={cn.headerLeftArea}>
      <span className={cn.headerLogo} onClick={onClickLogo}>woolta</span>
    </div>
    <span className={cn.flexAuto}/>
    <div className={cn.headerRightArea}>
                <span className={cx(cn.headerMenu, cn.headerMobileSideBarMenu)}
                      onClick={onClickSideBar}>
                    <MdList/>
                </span>
    </div>
  </div>

);
export default Header;
