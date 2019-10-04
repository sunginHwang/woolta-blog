import React, { useCallback, useRef } from 'react';
import cn from './PostWriteForm.scss';

interface PostWriteFormProps {
  content: string;
  onChangeContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeContentIndex: (index: number) => void;
}

const PostWriteForm = ({
                         content,
                         onChangeContent,
                         onChangeContentIndex,
                       }: PostWriteFormProps) => {
  const contentRef = useRef(null);

  const onFocusContent = useCallback(() => onChangeContentIndex(contentRef.current.selectionStart), []);

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