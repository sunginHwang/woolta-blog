import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import throttle from 'lodash/throttle';
import { RootState } from '../../models/redux/RootState';
import NanoBarLoading from '../../components/common/loading/NanoBarLoading/NanoBarLoading';
import SpinnerLoading from '../../components/common/loading/SpinnerLoading/SpinnerLoading';

import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import SideBar from '../../components/layout/SideBar/SideBar';

import * as layoutReducer from '../../store/reducers/layoutReducer';
import * as authReducer from '../../store/reducers/authReducer';

import { goPostListPage, goLoginPage, goPostEditPage, goMainPage } from '../../core/util/routeUtil';
import { nanoBarLoadingSetup } from '../../core/util/apiCall';

// @ts-ignore
import cn from './LayoutContainer.scss';
import { Store } from 'redux';
import { getCategories } from '../../store/reducers/categoryReducer';
import { fetchCategories } from '../../core/api/blogApi';
import Index from '../../pages';

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
    let lastScroll = 0;

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

//
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


  return <div>
    <SideBar
      isOpen={sideBar}
      authInfo={authInfo}
      onClickCategoryPage={onClickCategoryPage}
      onClickSideBarPage={onClickSideBarPage}
      onClickLogout={onClickLogout}
      categories={categories}
    />
    <Header
      showMobileHeader={mobileHeader}
      onClickLogo={() => this.onClickSideBarPage('main')}
      onClickSideBar={() => onToggleSideBar(!sideBar)}
    />
    <SpinnerLoading loading={spinnerLoading}/>
    <NanoBarLoading/>
    <div className={cx(cn.contentWrapper, !editMode && cn.contentWidth)}>
      {
        children
      }
    </div>
    <Footer/>
  </div>;
};

export default LayoutContainer;