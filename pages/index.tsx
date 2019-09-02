import React from 'react';
import { Store } from 'redux';

import { useSelector } from 'react-redux';
import { postInitType } from '../store/reducers/postReducer';
import { getRecentPosts, postsInitType } from '../store/reducers/postsReducer';
import { fetchRecentPostList } from '../core/api/blogApi';
import { categoryInitType } from '../store/reducers/categoryReducer';

import IntroPage from '../components/main/IntroPage/IntroPage';
import PostsPlaceHolder from '../components/post/list/PostsPlaceHolder/PostsPlaceHolder';
import PostLayout from '../components/post/list/PostLayout/PostLayout';

interface IndexProps {
  getInitialProps: any,
}

export type RootState = {
  postReducer: postInitType;
  postsReducer: postsInitType;
  categoriesReducer: categoryInitType;
};


const Index: IndexProps = () => {

  const { posts, loading } = useSelector((state: RootState) => state.postsReducer);

  const newPosts = loading
    ? <PostsPlaceHolder/>
    : <PostLayout posts={posts}/>;

  return (
    <div>
      <IntroPage/>
      {newPosts}
    </div>

  );

};

Index.getInitialProps = async ({ store }: { store: Store<RootState> }) => {
  await store.dispatch(getRecentPosts(fetchRecentPostList()));
  return {};
};


export default Index;
