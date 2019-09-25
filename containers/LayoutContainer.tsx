import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import throttle from 'lodash/throttle';
import { RootState } from '../types/redux/RootState';
import NanoBarLoading from '../components/common/loading/NanoBarLoading/NanoBarLoading';
import SpinnerLoading from '../components/common/loading/SpinnerLoading/SpinnerLoading';

import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';
import SideBar from '../components/layout/SideBar/SideBar';

import * as layoutReducer from '../store/reducers/layoutReducer';
import { closeToast } from '../store/reducers/layoutReducer';
import * as authReducer from '../store/reducers/authReducer';
import { nanoBarLoadingSetup } from '../core/utils/apiCall';
import Content from '../components/layout/Content/Content';
import NotificationBar from '../components/common/notification/NotificationBar/NotificationBar';


interface LayoutContainerProps {
  children?: React.ReactNode;
  getInitialProps?: any;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ children }) => {

  const [showSidebar, setShowSideBar] = useState(false);

  const {
    layoutReducer: { mobileHeader, editMode, spinnerLoading, toast },
    categories,
    userInfo,
  } = useSelector((state: RootState) => ({
    layoutReducer: state.layoutReducer,
    categories: state.categoryReducer.categories,
    userInfo: state.authReducer.userInfo,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    nanoBarLoadingSetup();
    onDetectMobileScrollUpAndDown();
  }, []);

  useEffect(() => {
    toast.isShow && setTimeout(() => dispatch(closeToast()), 2000);
  }, [toast.isShow]);

// 모바일 스크롤 헤더 이벤트
  const onDetectMobileScrollUpAndDown = React.useCallback(() => {
    let lastScroll: number = 0;

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
        userInfo={userInfo}
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
      <Content editMode={editMode}>
        {children}
      </Content>
      <NotificationBar isShow={toast.isShow}
                       message={toast.message}
      />
      <Footer/>
    </>
  );
};

export default React.memo(LayoutContainer);