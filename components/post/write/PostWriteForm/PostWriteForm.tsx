import React, { useCallback, useRef } from 'react';
import cn from './PostWriteForm.scss';
import { MdAddToPhotos } from 'react-icons/md';
import { ICategory } from '../../../../types/post/ICategory';
import Select from 'react-select';

interface PostWriteFormProps {
  category: string;
  categories: ICategory[];
  title: string;
  content: string;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeCategories: (selectedCategory: ICategory) => void;
  onUploadImage: () => void;
  onChangeContentIndex: (index: number) => void;

}

const PostWriteForm: React.FC<PostWriteFormProps> = ({
                                                       title,
                                                       content,
                                                       category,
                                                       categories,
                                                       onChangeTitle,
                                                       onUploadImage,
                                                       onChangeContent,
                                                       onChangeCategories,
                                                       onChangeContentIndex,
                                                     }) => {
  const contentRef = useRef(null);

  const onFocusContent = useCallback(() => onChangeContentIndex(contentRef.current.selectionStart), []);

  return (
    <>
      <div className={cn.postWriteSelector}>
        <Select
          value={category}
          onChange={onChangeCategories}
          options={categories}/>
      </div>
      <div className={cn.postWriteTitle}>
        <input type='text'
               value={title}
               placeholder='제목을 입력해 주세요.'
               onChange={onChangeTitle}
        />
        <div className={cn.postWriteTitle__imgInsertButton}
             onClick={onUploadImage}>
          <span><MdAddToPhotos/>이미지 업로드</span>
        </div>
      </div>
      <textarea className={cn.postWriteContent}
                value={content}
                ref={contentRef}
                placeholder='작성할 내용을 입력해 주세요.'
                onClick={onFocusContent}
                onChange={onChangeContent}
      />
    </>
  );
};

export default PostWriteForm;