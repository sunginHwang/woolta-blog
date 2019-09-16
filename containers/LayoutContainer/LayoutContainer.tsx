import React, { useEffect, useState } from 'react';
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
import { nanoBarLoadingSetup } from '../../core/utils/apiCall';
import cn from './LayoutContainer.scss';

const cx = classNames.bind(cn);

interface LayoutContainerProps {
  children?: React.ReactNode;
  getInitialProps?: any;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ children }) => {
  console.log('layout');

  const [showSidebar, setShowSideBar] = useState(false);

  const {
    mobileHeader,
    categories,
    authInfo,
    editMode,
    spinnerLoading,
  } = useSelector((state: RootState) => ({
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
  const onDetectMobileScrollUpAndDown = React.useCallback(() => {
    let lastScroll: number = 0;
    console.log('onDetectMobileScrollUpAndDown');
    window.onscroll = throttle(() => {
      if (!showSidebar) {
        const currentScroll: number = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
        let isScrollDown: boolean = lastScroll < currentScroll && currentScroll >= 0;
        lastScroll = currentScroll;
        dispatch(layoutReducer.showMobileHeader(isScrollDown));
      }
    }, 100);
  }, [showSidebar]);

  // 로그아웃
  const onClickLogout = () => dispatch(authReducer.logout());

  return (
    <>
      <SideBar
        isOpen={showSidebar}
        authInfo={authInfo}
        categories={categories}
        onClickLogout={onClickLogout}
        toggleSideBar={setShowSideBar}
      />
      <Header
        showSideBar={showSidebar}
        showMobileHeader={mobileHeader}
        toggleSideBar={setShowSideBar}
      />
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