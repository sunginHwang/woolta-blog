import React, { useEffect } from 'react';
import { NextPageCustom } from '../models/next/NextPageCustom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../models/redux/RootState';
import PostsPlaceHolder from '../components/post/list/PostsPlaceHolder/PostsPlaceHolder';
import { fetchPosts } from '../core/api/blogApi';
import { getPosts } from '../store/reducers/postsReducer';
import PostLayout from '../components/post/list/PostLayout/PostLayout';

interface PostsProps {
  categoryNo: number;
  isServer: boolean;
}

const Posts: NextPageCustom<PostsProps> = ({ categoryNo, isServer }) => {

  const { posts, loading } = useSelector((state: RootState) => state.postsReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    !isServer && dispatch(getPosts(fetchPosts(categoryNo)))
  }, [categoryNo]);

  if (loading) return <PostsPlaceHolder/>;

  return (
    <PostLayout posts={posts}/>
  );
};

Posts.getInitialProps = async ({ store, query, isServer }) => {
  const categoryNo = Number(query.categoryNo);
  isServer && await store.dispatch(getPosts(fetchPosts(categoryNo)));
  return { categoryNo, isServer };
};

export default Posts;
