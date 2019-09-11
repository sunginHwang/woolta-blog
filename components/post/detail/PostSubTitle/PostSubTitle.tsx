import React from 'react';
import cn from './PostSubTitle.scss';

interface PostSubTitleProps {
  writerName: string
  writerImg: string
  categoryLabel: string
  editAuth: boolean
  onClickPostModify: () => void
  onClickDeletePost: () => void
  createdAt: string
}

const PostSubTitle: React.FC<PostSubTitleProps> = ({
                                                     writerName,
                                                     writerImg,
                                                     categoryLabel,
                                                     editAuth,
                                                     onClickPostModify,
                                                     onClickDeletePost,
                                                     createdAt,
                                                   }) => {
  const renderEditPost = editAuth &&
    <div className={cn.rightArea}>
      <div className={cn.eventButton}
           onClick={() => onClickPostModify()}>
        수정
      </div>
      <div className={cn.eventButton}
           onClick={() => onClickDeletePost()}>
        삭제
      </div>
    </div>;

  return (
    <div className={cn.subTitleArea}>
      <span className={cn.author}><img className={cn.userImage} src={writerImg}/></span>
      <span>{writerName}</span><span className={cn.separator}> | </span>
      <span>{categoryLabel}</span><span className={cn.separator}> | </span>
      <span>{createdAt}</span>
      {renderEditPost}
    </div>
  );
};

export default PostSubTitle;




