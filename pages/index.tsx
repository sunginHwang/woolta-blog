import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getRecentPosts } from '../store/reducers/postsReducer';
import PostsPlaceHolder from '../components/post/list/PostsPlaceHolder';
import PostLayout from '../components/post/list/PostLayout';
import { NextPageCustom } from '../types/next/NextPageCustom';
import { RootState } from '../types/redux/RootState';
import useTitle from '../core/hooks/useTitle';

const Index: NextPageCustom<{}> = () => {

  const { posts, loading } = useSelector((state: RootState) => state.postsReducer);
  const setTitle = useTitle();

  useEffect(()=>setTitle('woolta blog'))

  const renderNewPosts = loading ? <PostsPlaceHolder/> : <PostLayout posts={posts}/>;

  return (
    <>
      {renderNewPosts}
    </>
  );
};

Index.getInitialProps = async ({ store }) => {
  await store.dispatch(getRecentPosts());
  return {};
};

export default React.memo(Index);
