import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import throttle from 'lodash/throttle';
import { RootState } from '../../types/redux/RootState';
import NanoBarLoading from '../../components/common/loading/NanoBarLoading/NanoBarLoading';
import SpinnerLoading from '../../components/common/loading/SpinnerLoading/SpinnerLoading';

import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import SideBar from '../../components/layout/SideBar/SideBar';

import * as layoutReducer from '../../store/reducers/layoutReducer';
import * as authReducer from '../../store/reducers/authReducer';

import { goLoginPage, goMainPage, goPostEditPage, goPostListPage } from '../../core/utils/routeUtil';
import { nanoBarLoadingSetup } from '../../core/utils/apiCall';
import cn from './LayoutContainer.scss';

const cx = classNames.bind(cn);

interface LayoutContainerProps {
  children?: React.ReactNode;
  getInitialProps?: any;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ children }) => {

  const {
    sideBar,
    mobileHeader,
    categories,
    authInfo,
    editMode,
    spinnerLoading,
  } = useSelector((state: RootState) => ({
    sideBar: state.layoutReducer.sideBar,
    mobileHeader: state.layoutReducer.mobileHeader,
    categories: state.categoryReducer.categories,
    authInfo: state.authReducer.authInfo,
    editMode: state.layoutReducer.editMode,
    spinnerLoading: state.layoutReducer.spinnerLoading,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    nanoBarLoadingSetup();
    onDetectMobileScrollUpAndDown();
  }, []);

// 모바일 스크롤 헤더 이벤트
  const onDetectMobileScrollUpAndDown = () => {
    let lastScroll: number = 0;

    window.onscroll = throttle(() => {
      if (!sideBar) {
        const currentScroll: number = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
        let isScrollDown: boolean = lastScroll < currentScroll && currentScroll >= 0;
        lastScroll = currentScroll;
        dispatch(layoutReducer.showMobileHeader(isScrollDown));
      }
    }, 100);
  };

// 사이드 메뉴 토글
  const onToggleSideBar = (isShow: boolean) => {
    dispatch(layoutReducer.toggleSideBar(isShow));
  };

// 카테고리 페이지 이동
  const onClickCategoryPage = (categoryNo) => {
    goPostListPage(categoryNo);
    onToggleSideBar(false);
  };

// 로그아웃
  const onClickLogout = () => {
    dispatch(authReducer.logout());
  };

  const onClickSideBarPage = (type: string) => {

    switch (type) {
      case 'login':
        goLoginPage();
        break;
      case 'postEdit':
        goPostEditPage();
        break;
      case 'main':
        goMainPage();
        break;
      default:
        break;
    }

    onToggleSideBar(false);
  };


  return (
    <>
      <SideBar
        isOpen={sideBar}
        authInfo={authInfo}
        onClickCategoryPage={onClickCategoryPage}
        onClickSideBarPage={onClickSideBarPage}
        onClickLogout={onClickLogout}
        categories={categories}/>
      <Header
        showMobileHeader={mobileHeader}
        onClickLogo={() => onClickSideBarPage('main')}
        onClickSideBar={() => onToggleSideBar(!sideBar)}/>
      <SpinnerLoading loading={spinnerLoading}/>
      <NanoBarLoading/>
      <div className={cx(cn.content, !editMode && cn.contentWidth)}>
        {children}
      </div>
      <Footer/>
    </>
  );
};

export default LayoutContainer;