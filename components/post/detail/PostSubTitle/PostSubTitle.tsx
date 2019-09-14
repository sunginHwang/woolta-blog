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
    <div>
      <div className={cn.postSubTitle__button}
           onClick={() => onClickPostModify()}>
        수정
      </div>
      <div className={cn.postSubTitle__button}
           onClick={() => onClickDeletePost()}>
        삭제
      </div>
    </div>;

  return (
    <div className={cn.postSubTitle}>
     <div>
       <span className={cn.postSubTitle__author}><img className={cn.postSubTitle__userImage} src={writerImg}/></span>
       <span>{writerName}</span><span className={cn.postSubTitle__separator}> | </span>
       <span>{categoryLabel}</span><span className={cn.postSubTitle__separator}> | </span>
       <span>{createdAt}</span>
     </div>
      {renderEditPost}
    </div>
  );
};

export default PostSubTitle;




