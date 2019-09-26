import { AppContext, AppInitialProps, Container } from 'next/app';
import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import store from '../store';

import LayoutContainer from '../containers/LayoutContainer';
import { getCategories } from '../store/reducers/categoryReducer';
import { fetchCategories } from '../core/api/blogApi';
import UserInfoLoadContainer from '../containers/UserInfoLoadContainer';
import '../style/scss/style.scss';
import Head from 'next/head';

type Props = { store: Store } & AppInitialProps & AppContext;

const App = (props: Props) => {

  const { Component, pageProps, store } = props;

  return (
    <Container>
      <Head>
        <title>woolta</title>
      </Head>
      <Provider store={store}>
        <>
          <UserInfoLoadContainer/>
          <LayoutContainer>
            <Component {...pageProps} />
          </LayoutContainer>
        </>
      </Provider>
    </Container>
  );
};


App.getInitialProps = async ({Component, ctx }) => {
  const pageProps = await Component.type.getInitialProps(ctx);
  ctx.isServer && await ctx.store.dispatch(getCategories(fetchCategories()));
  return { pageProps };
};

export default withRedux(store)(App);

