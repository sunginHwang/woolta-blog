import React, { useEffect } from 'react';
import { NextPageCustom } from '../types/next/NextPageCustom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/redux/RootState';
import PostsPlaceHolder from '../components/post/list/PostsPlaceHolder';
import { getPosts } from '../store/reducers/postsReducer';
import PostLayout from '../components/post/list/PostLayout';
import useTitle from '../core/hooks/useTitle';

interface PostsProps {
  categoryNo: number;
  isServer: boolean;
}

const Posts: NextPageCustom<PostsProps> = ({ categoryNo, isServer }) => {

  const { posts, loading, categories } = useSelector((state: RootState) => ({
    posts: state.postsReducer.posts,
    loading: state.postsReducer.loading,
    categories: state.categoryReducer.categories,
  }));

  const dispatch = useDispatch();
  const setTitle = useTitle();

  useEffect(() => {
    !isServer && dispatch(getPosts(categoryNo));
    changeHeaderTitle();
  }, [categoryNo]);

  const getCategoryNameByCategoryNo = (categoryNo: number) => {
    const category = categories.find((c) => c.value == categoryNo);
    return category !== undefined ? category.label : '';
  };

  const changeHeaderTitle = () => {
    const headerTitle = getCategoryNameByCategoryNo(categoryNo);
    setTitle(headerTitle);
  };

  if (true) return <PostsPlaceHolder/>;

  return <PostLayout posts={posts}/>;
};

Posts.getInitialProps = async ({ store, query, isServer }) => {
  const categoryNo = Number(query.categoryNo);
  isServer && await store.dispatch(getPosts(categoryNo));
  return { categoryNo, isServer };
};

export default React.memo(Posts);
