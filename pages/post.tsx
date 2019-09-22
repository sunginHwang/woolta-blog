import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostContent from '../components/post/detail/PostContent/PostContent';
import PostSeoHeader from '../components/post/detail/PostSeoHeader/PostSeoHeader';
import PostPlaceHolder from '../components/post/detail/PostPlaceHolder/PostPlaceHolder';
import { deletePost, getPost } from '../store/reducers/postReducer';
import { delPost, fetchPosts } from '../core/api/blogApi';
import { settingPostInfo } from '../store/reducers/postWriteReducer';
import { goPostEditPage, goPostListPage } from '../core/utils/routeUtil';
import { RootState } from '../types/redux/RootState';
import { NextPageCustom } from '../types/next/NextPageCustom';
import { getPosts } from '../store/reducers/postsReducer';

interface PostProps {
  categoryNo: number;
  postNo: number;
  isServer: boolean;
}

const post: NextPageCustom<PostProps> = ({ categoryNo, postNo, isServer }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    !isServer && dispatch(getPost({ categoryNo, postNo }));
  }, [getPost]);

  const { post, loading, userInfo, categories } = useSelector((state: RootState) => ({
    post: state.postReducer.post,
    loading: state.postReducer.loading,
    userInfo: state.authReducer.userInfo,
    categories: state.categoryReducer.categories,
  }));

  /*게시글 수정*/
  const onModifyPost = useCallback(async () => {
    const { postNo, title, content, categoryLabel } = post;
    const category = categories.find((c) => c.label === categoryLabel);

    await dispatch(settingPostInfo({ postNo, title, content, category }));
    goPostEditPage();
  }, [post, categories]);

  /*게시글 삭제*/
  const onDeletePost = useCallback(async () => {
    const { postNo, categoryLabel } = post;
    const category = categories.find((c) => c.label === categoryLabel);

    try {
      await dispatch(deletePost(delPost(category.value, postNo)));
      await dispatch(getPosts(fetchPosts(category.value)));
      goPostListPage(category.value);
    } catch (e) {
      alert('삭제 실패');
    }
  }, [post, categories]);

  const isPostingUser = userInfo.no === post.writer.no;

  if (loading) return <PostPlaceHolder/>;
  if (post.postNo === 0) return null;

  return (
    <>
      <PostSeoHeader
        post={post}
        postNo={postNo}
        categoryNo={categoryNo}/>
      <PostContent
        post={post}
        editAuth={isPostingUser}
        onModifyPost={onModifyPost}
        onDeletePost={onDeletePost}/>
    </>
  );
};

post.getInitialProps = async ({ store, query, isServer }) => {
  const categoryNo = Number(query.categoryNo);
  const postNo = Number(query.postNo);

  isServer && await store.dispatch(getPost({ categoryNo, postNo }));

  return { categoryNo, postNo, isServer };
};

export default React.memo(post);