import * as React from 'react';
import classNames from 'classnames/bind';
import { MdList } from 'react-icons/md';

import cn from './Header.scss';

const cx = classNames.bind(cn);

interface IHeaderProps {
  onClickSideBar: () => void,
  onClickLogo: () => void,
  showMobileHeader: boolean
}

const Header: React.FC<IHeaderProps> = ({
                                          onClickSideBar,
                                          onClickLogo,
                                          showMobileHeader,
                                        }) => (
  <div className={cx(cn.mainHeader, { mainHeader_hide: showMobileHeader })}>
    <span className={cn.mainHeader__logo} onClick={onClickLogo}>woolta</span>
    <span className={cx(cn.mainHeader__menu)} onClick={onClickSideBar}>
          <MdList/>
      </span>
  </div>

);
export default Header;
