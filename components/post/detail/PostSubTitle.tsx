import React from 'react';
import styled from 'styled-components';
import { IWriter } from '../../../types/post/IWriter';
import layouts from '../../../style/layouts';
import colors from '../../../style/colors';
import mixins from '../../../style/mixins';

type PostSubTitleProps  = {
  writer: IWriter;
  categoryLabel: string
  editAuth: boolean
  goModifyPostPage: () => void
  onDeletePost: () => void
  createdAt: string
}

function PostSubTitle({
                        writer,
                        categoryLabel,
                        editAuth,
                        goModifyPostPage,
                        onDeletePost,
                        createdAt,
                      }: PostSubTitleProps) {

  const renderEditPost = editAuth &&
    <div>
      <S.PostSubTitleButton onClick={goModifyPostPage}>수정</S.PostSubTitleButton>
      <S.PostSubTitleButton onClick={onDeletePost}>삭제</S.PostSubTitleButton>
    </div>;

  return (
    <S.PostSubTitle>
      <div>
        <S.PostSubTitleAuthor>
          <img src={writer.imageUrl} alt='wooltaUserImg'/>
        </S.PostSubTitleAuthor>
        <span>{writer.nickName}</span><S.PostSubTitleSeparator> | </S.PostSubTitleSeparator>
        <span>{categoryLabel}</span><S.PostSubTitleSeparator> | </S.PostSubTitleSeparator>
        <span>{createdAt}</span>
      </div>
      {renderEditPost}
    </S.PostSubTitle>
  );
};

PostSubTitle.defaultProps = {
  writer: {
    no: 0,
    nickName: '',
    imageUrl: '',
  },
  categoryLabel: '',
  editAuth: false,
};

export default PostSubTitle;

const S: any = {};

S.PostSubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  @media screen and (max-width: ${layouts.phoneWidth}) {
    padding-bottom: 2.5rem;
  }

  span {
    color: ${colors.sideFontGrayColor};
    margin-right: .5rem;
    font-size: 1.6rem;
    display: inline-block;
  }
`;

S.PostSubTitleButton = styled.div`
  ${mixins.mainButton};
  text-align: center;
  width: 6rem;
  font-size: 1.6rem;
  float: right;
  margin-left: 1rem;
  padding: .5rem;
`;


S.PostSubTitleAuthor = styled.span`
  margin-right: .5rem;
  width: 3rem;
  height: 3rem;
  
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
`;

S.PostSubTitleSeparator = styled.span`
    color: #ebebeb !important;
`;



