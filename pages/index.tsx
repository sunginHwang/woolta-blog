import React from 'react';
import { useSelector } from 'react-redux';
import { getRecentPosts } from '../store/reducers/postsReducer';
import { fetchRecentPostList } from '../core/api/blogApi';
import IntroPage from '../components/main/IntroPage/IntroPage';
import PostsPlaceHolder from '../components/post/list/PostsPlaceHolder/PostsPlaceHolder';
import PostLayout from '../components/post/list/PostLayout/PostLayout';
import { NextPageCustom } from '../models/next/NextPageCustom';
import { RootState } from '../models/redux/RootState';

const Index: NextPageCustom<{}> = () => {

  const { posts, loading } = useSelector((state: RootState) => state.postsReducer);
  const renderNewPosts = loading ? <PostsPlaceHolder/> : <PostLayout posts={posts}/>;

  return (
    <div>
      <IntroPage/>
      {renderNewPosts}
    </div>
  );
};

Index.getInitialProps = async ({ store }) => {
  await store.dispatch(getRecentPosts(fetchRecentPostList()));
  return {};
};

export default Index;
