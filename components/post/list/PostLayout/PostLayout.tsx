import React from 'react';
import PostItem from '../PostItem/PostItem';
import cn from './PostLayout.scss';
import { IPost } from '../../../../types/post/IPost';

interface PostLayoutProps {
  posts: IPost[],
}

const PostLayout: React.FC<PostLayoutProps> = React.memo(({ posts }) => {

  const renderPostItems = posts.map(post => <PostItem post={post} key={post.postNo}/>);

  return (
    <div className={cn.contentList}>
      {renderPostItems}
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.posts !== nextProps.posts;
});

export default PostLayout;


