import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { IPost } from '../../../types/post/IPost';
import colors from '../../../style/colors';
import layouts from '../../../style/layouts';


type PostItemProps = {
  post: IPost;
}

function PostItem({ post }: PostItemProps) {
  return (
    <S.PostItem>
      <Link href={`/post?postNo=${post.postNo}&categoryNo=${post.categoryNo}`}
            as={`/categories/${post.categoryNo}/posts/${post.postNo}`}>
        <a>
          <S.PostItemTitle>{post.title}</S.PostItemTitle>
        </a>
      </Link>
      <Link href={`/post?postNo=${post.postNo}&categoryNo=${post.categoryNo}`}
            as={`/categories/${post.categoryNo}/posts/${post.postNo}`}>
        <a>
          <S.PostItemContent>{post.subDescription}</S.PostItemContent>
        </a>
      </Link>
      <div>
        <S.categoryLabel>{post.categoryLabel}</S.categoryLabel>
        <S.Separator>|</S.Separator>
        <S.Meta>{post.author}</S.Meta>
        <S.Separator>|</S.Separator>
        <S.Meta>{post.createdAt}</S.Meta>
      </div>
    </S.PostItem>
  );
};

PostItem.defaultProps = {
  post: {
    postNo: 0,
    title: '',
    categoryLabel: '',
    createdAt: '',
    content: '',
    writer: {
      no: 0,
      nickName: '',
      imageUrl: '',
    },
  },
};


export default React.memo(PostItem, ((prevProps, nextProps) => {
  return prevProps.post.title !== nextProps.post.title;
}));

const S: any = {};

S.PostItem = styled.div`
  text-align: left;
  padding-bottom: 1.6rem;
  padding-top: 2.72rem;
  border-bottom: .2rem solid ${colors.bottomLineColor};

  @media screen and (max-width: ${layouts.phoneWidth}){
    padding-bottom: 0.8rem;
    padding-top: 1.92rem;
  }
`;

S.PostItemTitle = styled.h2`
  color: ${colors.mainThemeColor};
  font-size: 2.88rem;
  font-weight: 700;
  margin-bottom: 1rem;
  cursor: pointer;

  @media screen and (max-width: ${layouts.phoneWidth}){
    font-size: 2.4rem;
  }
`;

S.PostItemContent = styled.h2`
  margin-bottom: 1rem;
  cursor: pointer;
  font-size: 1.76rem;
  color: ${colors.mainThemeColor};
  max-width: 80%;
  line-height: 2.64rem;
    
  @media screen and (max-width: ${layouts.phoneWidth}){
    font-size: 1.28rem;
    max-width: 100%;
  }
`;


S.Meta = styled.span`
  color: ${colors.sideFontGrayColor};
  font-size: 1.28rem;
  margin-right: .5rem;

  @media screen and (max-width: ${layouts.phoneWidth}){
    font-size: 1rem;
  }
`;

S.Separator = styled.span`
  font-size: 1.28rem;
  color: #ebebeb;
  margin-right: .5rem;
  
  @media screen and (max-width: ${layouts.phoneWidth}){
    font-size: 1rem;
  }
`;

S.categoryLabel = styled.span`
  ${S.Meta};
  color:#9ba5a0 !important;
  margin-right: 1rem !important;
`;
