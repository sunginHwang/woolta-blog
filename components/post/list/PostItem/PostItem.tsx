import React from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import cn from './PostItem.scss';

const cx = classNames.bind(cn);

interface PostItemProps {
  title: string,
  postNo: number,
  contents: string,
  author: string,
  date: string,
  categoryNo: number,
  categoryLabel: string
}

const PostItem: React.FC<PostItemProps> = React.memo(({
                                                        title, postNo, contents, author, date,
                                                        categoryNo, categoryLabel,
                                                      }) => {

  return (
    <div className={cn.postItem}>
      <Link href={`/post?postNo=${postNo}&categoryNo=${categoryNo}`}
            as={`/categories/${categoryNo}/posts/${postNo}`}>
        <a>
          <h2 className={cn.title}>{title}</h2>
        </a>
      </Link>
      <Link href={`/post?postNo=${postNo}&categoryNo=${categoryNo}`}
            as={`/categories/${categoryNo}/posts/${postNo}`}>
        <a>
          <p className={cn.content}>{contents}</p>
        </a>
      </Link>
      <div>
        <span className={cx(cn.meta, cn.categoryLabel)}>{categoryLabel}</span>
        <span className={cn.separator}>|</span>
        <span className={cn.meta}>{author}</span>
        <span className={cn.separator}>|</span>
        <span className={cn.meta}>{date}</span>
      </div>
    </div>
  );

}, ((prevProps, nextProps) => {
  return prevProps.title !== nextProps.title;
}));


export default PostItem;

