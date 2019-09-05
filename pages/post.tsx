import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostContent from '../components/post/detail/PostContent/PostContent';
import PostSeoHeader from '../components/post/detail/PostSeoHeader/PostSeoHeader';
import PostPlaceHolder from '../components/post/detail/PostPlaceHolder/PostPlaceHolder';
import { deletePost, getPost } from '../store/reducers/postReducer';
import { delPost, fetchPostInfo } from '../core/api/blogApi';
// @ts-ignore
import { settingPostInfo } from '../store/reducers/postWriteReducer';
// @ts-ignore
import { goPostEditPage } from '../core/util/routeUtil';
import { RootState } from '../models/redux/RootState';
import { NextPageCustom } from '../models/next/NextPageCustom';

interface PostProps {
  categoryNo: number;
  postNo: number;
}

const post: NextPageCustom<PostProps> = (props) => {

  const {categoryNo, postNo} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useEffect-start');
    console.log(categoryNo);
    console.log(postNo);
    console.log('useEffect-end');

    dispatch(getPost(fetchPostInfo(categoryNo, postNo)));
  }, [categoryNo, postNo]);

  const {
    post,
    loading,
    categories,
  } = useSelector((state: RootState) => ({
    post: state.postReducer.post,
    loading: state.postReducer.loading,
    categories: state.categoryReducer.categories,
  }));

  /*게시글 수정*/
  const onClickPostModify = async () => {
    const { postNo, title, content, categoryLabel } = post;
    const category = categories.find((c) => c.label === categoryLabel);

    await dispatch(settingPostInfo({ postNo, title, content, category }));
    goPostEditPage();
  };

  /*게시글 삭제*/
  const onClickDeletePost = () => {
    const { postNo, categoryLabel } = post;
    const category = categories.find((c) => c.label === categoryLabel);

    dispatch(deletePost(delPost(category.value, postNo)));
  };

  //todo 권한 작업 진행 해야 함.
  // const isPostingUser = authInfo.no === post.writer.no;
  const isPostingUser = true;

  if (loading) return <PostPlaceHolder/>;
  if (post.postNo === 0) return null;

  return (
    <div>
      <PostSeoHeader
        title={post.title}
        content={post.content}
        postNo={postNo}
        createdAt={post.createdAt}
        categoryNo={categoryNo}/>
      <PostContent
        post={post}
        editAuth={isPostingUser}
        categoryLabel={post.categoryLabel}
        onClickPostModify={onClickPostModify}
        onClickDeletePost={onClickDeletePost}
        createdAt={post.createdAt}/>
    </div>
  );

};

post.getInitialProps = async ({ store, query }) => {
  const categoryNo = Number(query.categoryNo);
  const postNo = Number(query.postNo);
  console.log('start-getInitialProps');
  await store.dispatch(getPost(fetchPostInfo(categoryNo, postNo)));
  console.log(categoryNo, postNo);
  console.log('end-getInitialProps');
  return { categoryNo, postNo };
};

export default post;


