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
      <div className={cn.PostWriteFormHeader}>
        <input type='text'
               value={title}
               placeholder='제목을 입력해 주세요.'
               onChange={onChangeTitle}
        />
        <div className={cn.PostWriteFormHeader__right}>
          <div className={cn.PostWriteFormHeader__right__selector}>
            <Select
              value={category}
              onChange={onChangeCategories}
              options={categories}
            />
          </div>
          <span className={cn.PostWriteFormHeader__right__imgInsert}
                onClick={onUploadImage}>
            <MdAddToPhotos/>
          </span>
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