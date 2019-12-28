import React from 'react';
import Head from 'next/head';
import { BLOG_THUMBNAIL_IMAGE_URL, BLOG_URL } from '../../../core/constants';
import { convertToPlainText } from '../../../core/utils/StringUtil';
import { IPost } from '../../../types/post/IPost';

type PostSeoHeaderProps = {
  post: IPost
  postNo: number
  categoryNo: number
}

function PostSeoHeader({
                         post,
                         postNo,
                         categoryNo,
                       }: PostSeoHeaderProps) {

  const isAllowUrl: boolean = categoryNo !== undefined && postNo !== undefined;
  const { title, content, createdAt } = post;

  return (
    <Head>
      {title && <title>{title}</title>}
      {title && <meta property="og:title" content={title}/>}
      {title && <meta name="twitter:title" content={title}/>}
      {content && <meta name="description" content={convertToPlainText(content)}/>}
      {content && <meta property="og:description" content={convertToPlainText(content)}/>}
      {content && <meta name="twitter:description" content={convertToPlainText(content)}/>}
      {isAllowUrl && <meta property="og:url" content={`${BLOG_URL}/categories/${categoryNo}/posts/${postNo}`}/>}
      {isAllowUrl && <meta property="twitter:url" content={`${BLOG_URL}/categories/${categoryNo}/posts/${postNo}`}/>}
      {isAllowUrl && <meta property="twitter:url" content={`${BLOG_URL}/categories/${categoryNo}/posts/${postNo}`}/>}
      {isAllowUrl && <link rel="canonical" href={`${BLOG_URL}/categories/${categoryNo}/posts/${postNo}`}/>}
      <meta property="og:image" content={BLOG_THUMBNAIL_IMAGE_URL}/>
      <meta name="twitter:image" content={BLOG_THUMBNAIL_IMAGE_URL}/>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:creator" content="@Hwang Sungin"/>
      <meta property="og:type" content="article"/>
      <meta property="article:published_time" content={createdAt}/>
    </Head>
  );
};

export default PostSeoHeader;



