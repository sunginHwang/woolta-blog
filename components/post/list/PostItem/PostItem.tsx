import React from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import cn from './PostItem.scss';
import { IPost } from '../../../../types/post/IPost';

const cx = classNames.bind(cn);

interface PostItemProps {
  post: IPost;
}

const PostItem = ({ post }: PostItemProps) => (
  <div className={cn.postItem}>
    <Link href={`/post?postNo=${post.postNo}&categoryNo=${post.categoryNo}`}
          as={`/categories/${post.categoryNo}/posts/${post.postNo}`}>
      <a>
        <h2 className={cn.postItem__title}>{post.title}</h2>
      </a>
    </Link>
    <Link href={`/post?postNo=${post.postNo}&categoryNo=${post.categoryNo}`}
          as={`/categories/${post.categoryNo}/posts/${post.postNo}`}>
      <a>
        <p className={cn.postItem__content}>{post.subDescription}</p>
      </a>
    </Link>
    <div>
      <span className={cx(cn.meta, cn.categoryLabel)}>{post.categoryLabel}</span>
      <span className={cn.separator}>|</span>
      <span className={cn.meta}>{post.author}</span>
      <span className={cn.separator}>|</span>
      <span className={cn.meta}>{post.createdAt}</span>
    </div>
  </div>
);


export default React.memo(PostItem, ((prevProps, nextProps) => {
  return prevProps.post.title !== nextProps.post.title;
}));

