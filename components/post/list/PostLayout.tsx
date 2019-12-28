import React from 'react';
import styled from 'styled-components';
import PostItem from './PostItem';
import { IPost } from '../../../types/post/IPost';
import layouts from '../../../style/layouts';

type PostLayoutProps = {
  posts: IPost[],
}

function PostLayout({ posts }: PostLayoutProps) {

  const renderPostItems = posts.map(post => <PostItem post={post} key={post.postNo}/>);

  return (
    <S.PostLayout>
      {renderPostItems}
    </S.PostLayout>
  );
};

PostLayout.defaultProps = {
  posts: [],
};

export default React.memo(PostLayout, (prevProps, nextProps) => {
  return prevProps.posts !== nextProps.posts;
});

const S: any = {};

S.PostLayout = styled.div`
  max-width: ${layouts.contentMaxWidth};
  margin: 0 auto;

  @media screen and (max-width: ${layouts.mobileWidth}){
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media screen and (max-width: ${layouts.phoneWidth}){
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;


