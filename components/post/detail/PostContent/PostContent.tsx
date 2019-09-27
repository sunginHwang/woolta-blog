import React from 'react';
import PostSubTitle from '../PostSubTitle/PostSubTitle';
import cn from './PostContent.scss';
import { IPost } from '../../../../types/post/IPost';
import MarkDownView from '../../../view/MarkDownView/MarkDownView';

interface PostContentProps {
  post: IPost;
  editAuth: boolean;
  onDeletePost: () => void;
  goModifyPostPage: () => void;
}

const PostContent: React.FC<PostContentProps> = React.memo(({
                                                              post,
                                                              editAuth,
                                                              onDeletePost,
                                                              goModifyPostPage,
                                                            }) => {

  return (
    <div className={cn.postContent}>
      <div className={cn.postContent__header}>
        <h1 className={cn.postContent__header__title}>{post.title}</h1>
        <PostSubTitle
          writer={post.writer}
          categoryLabel={post.categoryLabel}
          createdAt={post.createdAt}
          editAuth={editAuth}
          goModifyPostPage={goModifyPostPage}
          onDeletePost={onDeletePost}/>
      </div>
      <div className={cn.postContent__content}>
        <MarkDownView content={post.content}
                      skipHtml={false}
                      escapeHtml={false}/>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.post === nextProps.post && prevProps.editAuth === nextProps.editAuth;
});

export default PostContent;

