import React from 'react';
import cn from './PostSubTitle.scss';
import { IWriter } from '../../../../types/post/IWriter';

interface PostSubTitleProps {
  writer: IWriter;
  categoryLabel: string
  editAuth: boolean
  goModifyPostPage: () => void
  onDeletePost: () => void
  createdAt: string
}

const PostSubTitle = ({
                        writer,
                        categoryLabel,
                        editAuth,
                        goModifyPostPage,
                        onDeletePost,
                        createdAt,
                      }: PostSubTitleProps) => {

  const renderEditPost = editAuth &&
    <div>
      <div className={cn.postSubTitle__button}
           onClick={goModifyPostPage}>수정
      </div>
      <div className={cn.postSubTitle__button}
           onClick={onDeletePost}>삭제
      </div>
    </div>;

  return (
    <div className={cn.postSubTitle}>
      <div>
        <span className={cn.postSubTitle__author}>
          <img className={cn.postSubTitle__userImage} src={writer.imageUrl}/>
        </span>
        <span>{writer.nickName}</span><span className={cn.postSubTitle__separator}> | </span>
        <span>{categoryLabel}</span><span className={cn.postSubTitle__separator}> | </span>
        <span>{createdAt}</span>
      </div>
      {renderEditPost}
    </div>
  );
};

export default PostSubTitle;




