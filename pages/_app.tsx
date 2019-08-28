import App, { Container } from 'next/app';
import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import store from '../store';

import LayoutContainer from '../containers/LayoutContainer/LayoutContainer';

interface StoreProps<S = Store> {
  store: S;
}

class MyApp extends App<StoreProps<Store>> {

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <LayoutContainer>
            <Component {...pageProps} />
          </LayoutContainer>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(store)(MyApp);

