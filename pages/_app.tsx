import { Container, AppInitialProps, AppContext } from 'next/app';
import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import store from '../store';

import LayoutContainer from '../containers/LayoutContainer/LayoutContainer';
import { getCategories } from '../store/reducers/categoryReducer';
import { fetchCategories } from '../core/api/blogApi';

type Props = { store: Store } & AppInitialProps & AppContext;

const App = (props: Props) => {

  const { Component, pageProps, store } = props;

  return (
    <Container>
      <Provider store={store}>
        <LayoutContainer>
          <Component {...pageProps} />
        </LayoutContainer>
      </Provider>
    </Container>
  );
};


App.getInitialProps = async ({ ctx }) => {
  await ctx.store.dispatch(getCategories(fetchCategories()));
  return {};
};

export default withRedux(store)(App);

