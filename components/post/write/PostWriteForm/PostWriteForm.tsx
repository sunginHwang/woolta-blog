import React, { useCallback, useRef } from 'react';
import cn from './PostWriteForm.scss';

interface PostWriteFormProps {
  content: string;
  changeContent: (content: string) => void;
  changeContentWriteIndex: (index: number) => void;
  changeScrollPosition: (scrollTopPosition: number) => void;
}

const PostWriteForm = ({
                         content,
                         changeContent,
                         changeContentWriteIndex,
                         changeScrollPosition,
                       }: PostWriteFormProps) => {
  const contentRef = useRef(null);

  const onFocusContent = useCallback(() => {
    const scrollTopPercent: number = (contentRef.current.scrollTop + contentRef.current.offsetHeight) / contentRef.current.scrollHeight * 100;
    changeScrollPosition(scrollTopPercent);
    changeContentWriteIndex(contentRef.current.selectionStart);
  }, []);

  const onChangeContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    changeContent(e.target.value);
    onFocusContent();
  }, []);

  return (
    <textarea className={cn.postWriteContent}
              value={content}
              ref={contentRef}
              placeholder='작성할 내용을 입력해 주세요.'
              onClick={onFocusContent}
              onChange={onChangeContent}
    />
  );
};

export default PostWriteForm;