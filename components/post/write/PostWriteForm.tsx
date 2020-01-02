import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';

type PostWriteFormProps = {
  content: string;
  changeContent: (content: string) => void;
  changeContentWriteIndex: (index: number) => void;
  changeScrollPosition: (scrollTopPosition: number) => void;
}

function PostWriteForm({
                         content,
                         changeContent,
                         changeContentWriteIndex,
                         changeScrollPosition,
                       }: PostWriteFormProps) {
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
    <S.PostWriteForm
      value={content}
      ref={contentRef}
      placeholder='작성할 내용을 입력해 주세요.'
      onClick={onFocusContent}
      onChange={onChangeContent}
    />
  );
};

PostWriteForm.defaultProps = {
  content: '',
} as PostWriteFormProps;

export default PostWriteForm;

const S: any = {};

S.PostWriteForm = styled.textarea`
  padding: 2rem;
  width: calc(100% - 4rem);
  display: inline-block;
  outline-style: none;
  height: calc(100% - 4.7rem);
  font-size: 1.6rem;
  border: none;
  resize: none;
`;