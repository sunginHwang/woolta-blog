import PostSubTitle from '../PostSubTitle/PostSubTitle';
// @ts-ignore
import cn from './PostContent.scss';
import React from 'react';
import { IPost } from '../../../../types/post/IPost';
import MarkDownView from '../../../view/MarkDownView/MarkDownView';


interface PostContentProps {
  post: IPost;
  categoryLabel: string;
  editAuth: boolean;
  onClickPostModify: () => void;
  onClickDeletePost: () => void;
  createdAt: string;
}

 const PostContent: React.FC<PostContentProps> = ({
                    post,
                    categoryLabel,
                    editAuth,
                    onClickPostModify,
                    onClickDeletePost,
                    createdAt
                }) =>
    <div className={cn.contentWrapper}>
        <div className={cn.titleArea}>
            <h1 className={cn.title}>
                {post.title}
            </h1>
            <PostSubTitle
                writerName={post.writer.nickName}
                writerImg={post.writer.imageUrl}
                categoryLabel={categoryLabel}
                createdAt={createdAt}
                editAuth={editAuth}
                onClickPostModify={onClickPostModify}
                onClickDeletePost={onClickDeletePost}
            />
        </div>
        <div className={cn.contentArea}>
            <MarkDownView content={post.content}
                          skipHtml={false}
                          escapeHtml={false}/>
        </div>
    </div>

export default PostContent;

