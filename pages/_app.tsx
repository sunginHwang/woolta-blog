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
import '../style/scss/style.scss';
import { PWA_LOG } from '../core/constants';

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
    <Container>
      <Provider store={store}>
        <>
          <LayoutContainer>
            <Component {...pageProps} />
          </LayoutContainer>
        </>
      </Provider>
    </Container>
  );
};


App.getInitialProps = async ({ Component, ctx }) => {
  if (Component.type) {
    const pageProps = await Component.type.getInitialProps(ctx);
    ctx.isServer && await ctx.store.dispatch(getCategories(fetchCategories()));
    return { pageProps };
  }

  return {};

};

export default withRedux(store)(App);

