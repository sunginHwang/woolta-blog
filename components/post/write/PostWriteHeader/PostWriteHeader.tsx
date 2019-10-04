import React from 'react';
import cn from './PostWriteHeader.scss';
import { IUserInfo } from '../../../../types/user/IUserInfo';

interface PostWriteHeaderProps {
  userInfo: IUserInfo;
}

const PostWriteHeader = ({ userInfo }: PostWriteHeaderProps) => {
  return (
    <div className={cn.postWriteHeader}>
      <img className={cn.postWriteHeader__author} src={userInfo.imageUrl}/>
      <span className={cn.postWriteHeader__authorName}>{`작성자 : ${userInfo.userId}`}</span>
    </div>
  );
};

export default PostWriteHeader;