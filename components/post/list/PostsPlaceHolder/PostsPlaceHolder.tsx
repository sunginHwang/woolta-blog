import React from 'react';
import PostItemPlaceHolder from '../../../post/list/PostItemPlaceHolder/PostItemPlaceHolder';
import cn from './PostsPlaceHolder.scss';

const PostsPlaceHolder: React.FC<{}> = () => (
  <div className={cn.postItemPlaceHolder}>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => <PostItemPlaceHolder key={index}/>)}
  </div>
);

export default PostsPlaceHolder;

