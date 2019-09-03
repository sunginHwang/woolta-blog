import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostContent from '../components/post/detail/PostContent/PostContent';
import PostSeoHeader from '../components/post/detail/PostSeoHeader/PostSeoHeader';
import PostPlaceHolder from '../components/post/detail/PostPlaceHolder/PostPlaceHolder';
import { deletePost, getPost } from '../store/reducers/postReducer';
import { delPost, fetchPostInfo } from '../core/api/blogApi';
import { RootState } from './index';
// @ts-ignore
import { settingPostInfo } from '../store/reducers/postWriteReducer';
// @ts-ignore
import { goPostEditPage } from '../core/util/routeUtil';

interface PostProps {
  categoryNo: number;
  postNo: number;
}

type NextPages<P = {}, IP = P> = {
  (props: P): JSX.Element | null
  defaultProps?: Partial<P>
  displayName?: string
  /**
   * Used for initial page load data population. Data returned from `getInitialProps` is serialized when server rendered.
   * Make sure to return plain `Object` without using `Date`, `Map`, `Set`.
   * @param ctx Context of `page`
   */
  getInitialProps?(ctx: any): Promise<IP>
}

const post: NextPages<PostProps> = ({
                                     categoryNo,
                                     postNo,
                                   }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(fetchPostInfo(categoryNo, postNo)));
  });

  const { post, loading } = useSelector((state: RootState) => ({
    post: state.postReducer.post,
    loading: state.postReducer.loading,
  }));


  /*게시글 수정*/
  const onClickPostModify = async () => {
 /*   const { postNo, title, content, categoryLabel } = post;
    const category = categories.find((c) => c.label === categoryLabel);

    await dispatch(settingPostInfo({ postNo, title, content, category }));
    goPostEditPage();*/
  };

  /*게시글 삭제*/
  const onClickDeletePost = () => {
   /* const { postNo, categoryLabel } = post;
    const category = categories.find((c) => c.label === categoryLabel);

    dispatch(deletePost(delPost(category.value, postNo)));*/
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

post.getInitialProps = async ({store, query }) => {
  const categoryNo = Number(query.categoryNo);
  const postNo = Number(query.postNo);
  await store.dispatch(getPost(fetchPostInfo(categoryNo, postNo)));

  return { categoryNo, postNo };
};

export default post;


