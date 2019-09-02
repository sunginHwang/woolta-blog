import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostContent from '../components/post/detail/PostContent/PostContent';
import PostSeoHeader from '../components/post/detail/PostSeoHeader/PostSeoHeader';
import PostPlaceHolder from '../components/post/detail/PostPlaceHolder/PostPlaceHolder';
import { deletePost, getPost } from '../store/reducers/postReducer';
import { delPost, fetchPostInfo } from '../core/api/blogApi';
import { RootState } from './index';
import { NextPage } from 'next';
// @ts-ignore
import { settingPostInfo } from '../store/reducers/postWriteReducer';
// @ts-ignore
import { goPostEditPage } from '../core/util/routeUtil';

interface PostProps {
  categoryNo: number;
  postNo: number;
}

const post: NextPage<PostProps> = ({
                                     categoryNo,
                                     postNo,
                                   }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(fetchPostInfo(categoryNo, postNo)));
  });

  const { post, loading } = useSelector((state: RootState) => state.postReducer);
  const { categories } = useSelector((state: RootState) => state.categoriesReducer);


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

post.getInitialProps = async ({ query }) => {
  const categoryNo = Number(query.categoryNo);
  const postNo = Number(query.postNo);
  return { categoryNo, postNo };
};

export default post;


