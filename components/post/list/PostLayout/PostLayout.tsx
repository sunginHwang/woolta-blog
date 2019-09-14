import React from 'react';
import PostItem from '../PostItem/PostItem';
import cn from './PostLayout.scss';
import IPosts from '../../../../types/post/IPosts';

interface PostLayoutProps {
  posts: IPosts[],
}

const PostLayout: React.FC<PostLayoutProps> = React.memo(({ posts }) => {

  const postItems = posts.map((post) => (
    <PostItem
      postNo={post.postNo}
      key={post.postNo}
      title={post.title}
      contents={post.subDescription}
      categoryLabel={post.categoryLabel}
      categoryNo={post.categoryNo}
      author={post.author}
      date={post.createdAt}/>
  ));

  return (
    <div className={cn.contentList}>
      {postItems}
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.posts !== nextProps.posts;
});

export default PostLayout;


