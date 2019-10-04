import * as React from 'react';
import classNames from 'classnames/bind';
import { MdList } from 'react-icons/md';

import cn from './Header.scss';
import { goMainPage } from '../../../core/utils/routeUtil';

const cx = classNames.bind(cn);

interface IHeaderProps {
  showMobileHeader: boolean;
  showSideBar: boolean;
  toggleSideBar: (toggle: boolean) => void;

}

const Header = ({
                  showMobileHeader,
                  showSideBar,
                  toggleSideBar,
                }: IHeaderProps) => {

  const onMainPageClick = React.useCallback(() => {
    goMainPage();
    toggleSideBar(false);
  }, []);

  const onToggleSideBar = React.useCallback(() => toggleSideBar(!showSideBar), [showSideBar]);

  return (
    <div className={cx(cn.mainHeader, { mainHeader_hide: showMobileHeader })}>
      <span className={cn.mainHeader__logo} onClick={onMainPageClick}>woolta</span>
      <span className={cx(cn.mainHeader__menu)} onClick={onToggleSideBar}>
          <MdList/>
      </span>
    </div>
  );
};
export default Header;
