import React from 'react';
import PostItemPlaceHolder from '../../../post/list/PostItemPlaceHolder/PostItemPlaceHolder';

// @ts-ignore
import cn from './PostsPlaceHolder.scss';

interface PostsPlaceHolderProps {
}

const PostsPlaceHolder: React.FC<PostsPlaceHolderProps> = () => {

  const postsPlaceHolder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => <PostItemPlaceHolder key={index}/>);

  return (
    <div className={cn.postItemPlaceHolder}>
      {
        postsPlaceHolder
      }
    </div>
  );
};

export default PostsPlaceHolder;

