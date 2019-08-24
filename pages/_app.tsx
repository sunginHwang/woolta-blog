import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import store from '../store';
import { Store } from 'redux';

interface StoreProps<S = Store> {
  store: S;
}

class MyApp extends App<StoreProps<Store>> {

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <div>
            <Component {...pageProps} />
          </div>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(store)(MyApp);

