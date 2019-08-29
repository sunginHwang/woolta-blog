import React, { useEffect, useState } from 'react';
import { Store } from 'redux';

import { useSelector, useDispatch } from 'react-redux';
import { increaseCounter, getSomething, initType } from '../store/reducers/postReducer';
import { getRecentPosts, postsInitType } from '../store/reducers/postsReducer';
import { fetchCategories, fetchRecentPostList } from '../core/api/blogApi';

import IntroPage from '../components/main/IntroPage/IntroPage';
import { ICategory } from '../models/post/ICategory';
import { AxiosResponse } from 'axios';
import { categoryInitType } from '../store/reducers/categoryReducer';
import IPosts from '../models/post/IPosts';
import PostsPlaceHolder from '../components/post/list/PostsPlaceHolder/PostsPlaceHolder';
import PostLayout from '../components/post/list/PostLayout/PostLayout';

interface IndexProps {
  getInitialProps: any,
  posts?: IPosts[]
}

export type RootState = {
  postReducer: initType;
  postsReducer: postsInitType;
  categoriesReducer: categoryInitType;
};


const Index: IndexProps = () => {

  const { posts, loading } = useSelector((state: RootState) => state.postsReducer);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getRecentPosts(fetchRecentPostList()))
  },[]);

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
  await console.log('getInitialProps');
  await store.dispatch(getRecentPosts(fetchRecentPostList()));
  return {};
};


export default Index;
