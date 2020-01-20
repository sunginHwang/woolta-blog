import { AppContext, AppInitialProps, Container } from 'next/app';
import React, { useEffect } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import store from '../store';

import LayoutContainer from '../containers/LayoutContainer';
import { getCategories } from '../store/reducers/categoryReducer';
import { fetchCategories } from '../core/api/blogApi';
import { initSubscribe } from '../pwa/pushConfig';
import { ThemeProvider } from 'styled-components';
import '../style/scss/style.scss';
import { ACCESS_TOKEN, PWA_LOG } from '../core/constants';
import darkTheme from '../style/theme/dark';
import { loadUserInfo } from '../store/reducers/authReducer';
import { settingAccessHeaderToken } from '../core/utils/apiCall';

type Props = { store: Store } & AppInitialProps & AppContext;

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

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Provider store={store}>
          <>
            <LayoutContainer>
              <Component {...pageProps} />
            </LayoutContainer>
          </>
        </Provider>
      </Container>
    </ThemeProvider>

  );
};


App.getInitialProps = async ({ Component, ctx }) => {
  if (Component.type) {
    const pageProps = await Component.type.getInitialProps(ctx);

    if (ctx.isServer) {
      await settingAccessHeaderToken(ctx.req.cookies[ACCESS_TOKEN]);
      await ctx.store.dispatch(loadUserInfo());
      await ctx.store.dispatch(getCategories(fetchCategories()));
    }

    return { pageProps };
  }

  return {};

};

export default withRedux(store)(App);

