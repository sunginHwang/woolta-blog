import { AppContext, AppInitialProps } from 'next/app';
import React, { useEffect } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import store from '../store';

import LayoutContainer from '../containers/LayoutContainer';
import { getCategories } from '../store/reducers/categoryReducer';
import { fetchCategories } from '../core/api/blogApi';
import { initSubscribe } from '../pwa/pushConfig';
import '../style/scss/style.scss';
import { ACCESS_TOKEN, PWA_LOG, SETTING_THEME } from '../core/constants';
import useDarkMode from '../core/hooks/useDarkMode';
import { loadUserInfo } from '../store/reducers/authReducer';
import { settingAccessHeaderToken } from '../core/utils/apiCall';
import Theme from '../components/layout/Theme';
import ToggleThemeSwitch from '../components/common/toggle/ToggleThemeSwitch';

type Theme = {
  initTheme: string;
}
type Props = { store: Store } & AppInitialProps & AppContext & Theme;

const App = (props: Props) => {

  const { Component, pageProps, store } = props;

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported');

      // @ts-ignore
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then((reg) => {
            console.log(`${PWA_LOG} registered`, reg);
            initSubscribe(reg);
          })
          .catch(e => console.log(e));
      });
    }
  }, []);
  const [theme, toggleTheme] = useDarkMode(props.initTheme);
  const isDarkMode = theme === 'dark';
  const s = {
    marginTop: '200px',
  };

  return (
    <Theme theme={theme}>
      <Provider store={store}>
        <>
          <button style={s} onClick={() => toggleTheme()}>{
            theme + '모드'
          }</button>
          <ToggleThemeSwitch isDarkMode={isDarkMode} onChangeTheme={() => toggleTheme()}/>
          <LayoutContainer>
            <Component {...pageProps} />
          </LayoutContainer>
        </>
      </Provider>
    </Theme>
  );

};


App.getInitialProps = async ({ Component, ctx }) => {
  let initTheme = '';
  if (Component.type) {
    const pageProps = await Component.type.getInitialProps(ctx);

    if (ctx.isServer) {
      initTheme = ctx.req.cookies[SETTING_THEME] || '';
      await settingAccessHeaderToken(ctx.req.cookies[ACCESS_TOKEN]);
      await ctx.store.dispatch(loadUserInfo());
      await ctx.store.dispatch(getCategories(fetchCategories()));
    }
    return { ...pageProps, initTheme };
  }

  return { initTheme };

};

export default withRedux(store)(App);

