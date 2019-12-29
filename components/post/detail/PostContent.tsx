import React from 'react';
import PostSubTitle from './PostSubTitle';
import styled from 'styled-components';
import { IPost } from '../../../types/post/IPost';
import MarkDownView from '../../view/MarkDownView';
import layouts from '../../../style/layouts';
import colors from '../../../style/colors';

type PostContentProps = {
  post: IPost;
  editAuth: boolean;
  onDeletePost: () => void;
  goModifyPostPage: () => void;
}

function PostContent({
                       post,
                       editAuth,
                       onDeletePost,
                       goModifyPostPage,
                     }: PostContentProps) {

  return (
    <S.postContent>
      <S.postContentHeader>
        <h1>{post.title}</h1>
        <PostSubTitle
          writer={post.writer}
          categoryLabel={post.categoryLabel}
          createdAt={post.createdAt}
          editAuth={editAuth}
          goModifyPostPage={goModifyPostPage}
          onDeletePost={onDeletePost}/>
      </S.postContentHeader>
      <S.postContentMarkdown>
        <MarkDownView content={post.content}
                      skipHtml={false}
                      escapeHtml={false}/>
      </S.postContentMarkdown>
    </S.postContent>
  );
};

PostContent.defaultProps = {
  post: {},
  editAuth: false,
};

export default React.memo(PostContent, (prevProps, nextProps) => {
  return prevProps.post === nextProps.post && prevProps.editAuth === nextProps.editAuth;
});

const S: any = {};

S.postContent = styled.div`
  text-align: left;
  margin-top: 3.2rem;

  @media screen and (max-width: ${layouts.mobileWidth}) {
    padding: 0 2rem 0 2rem;
  }

  @media screen and (max-width: ${layouts.phoneWidth}) {
    padding: 0 1.6rem 0 1.6rem;
  }
`;

S.postContentHeader = styled.div`
  padding: 0;
  margin-bottom: 4.5rem;
  border-bottom: .1rem solid #eee;
    
  @media screen and (max-width: ${layouts.phoneWidth}) {
    font-size: 4rem;
  }
  
  h1{
    line-height: 5.72rem;
    letter-spacing: -.22rem;
    word-break: break-word;
    font-weight: 700;

    font-size: 4.4rem;
    margin-top: 3rem;
    margin-bottom: 1rem;
    color: ${colors.titleFontColor};

    @media screen and (max-width: ${layouts.phoneWidth}) {
      font-size: 4rem;
    }
  }
`;

S.postContentMarkdown = styled.div`
  color: ${colors.customBlackColor} !important;
  word-break: break-all;
`;