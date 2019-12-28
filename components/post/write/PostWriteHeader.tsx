import React from 'react';
import styled from 'styled-components';
import { IUserInfo } from '../../../types/user/IUserInfo';
import colors from '../../../style/colors';

type PostWriteHeaderProps = {
  userInfo: IUserInfo;
}

function PostWriteHeader({ userInfo }: PostWriteHeaderProps) {
  return (
    <S.postWriteHeader>
      <img src={userInfo.imageUrl} alt='postWriterImg'/>
      <span>{`작성자 : ${userInfo.userId}`}</span>
    </S.postWriteHeader>
  );
};

PostWriteHeader.defaultProps = {
  userInfo: {
    no: 0,
    userId: '',
  },
};

export default PostWriteHeader;

const S: any = {};

S.postWriteHeader = styled.div`
  text-align: left;
  margin-bottom: 2rem;
  
  img{
    border-radius: 50%;
    margin-right: 1rem;
    width: 3rem;
    height: 3rem;
    vertical-align: middle;
  }
  
  span{
    color: ${colors.mainThemeColor};
    font-weight: bold;  
  }
`;