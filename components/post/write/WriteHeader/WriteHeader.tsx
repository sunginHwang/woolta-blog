import React from 'react';
import { MdImage, MdSave } from 'react-icons/md';
import Select from 'react-select';

import cn from './WriteHeader.scss';
import { ICategory } from '../../../../types/post/ICategory';


interface WriteHeaderProps {
  title: string;
  category: string;
  categories: ICategory[];
  upsertPost: () => void;
  onImageUpload: () => void;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCategories: (selectedCategory: ICategory) => void;
}

const WriteHeader = ({
                       title,
                       category,
                       categories,
                       upsertPost,
                       onImageUpload,
                       onChangeTitle,
                       onChangeCategories,
                     }: WriteHeaderProps) => (

  <div className={cn.writeHeader}>
    <div className={cn.writeHeader__left}>
      <input type='text'
             value={title}
             placeholder='제목을 입력해 주세요.'
             onChange={onChangeTitle}
      />
    </div>
    <div className={cn.writeHeader__right}>
      <div className={cn.writeHeader__right__select}>
        <Select
          value={category}
          onChange={onChangeCategories}
          options={categories}
        />
      </div>
      <div className={cn.writeHeader__right__button} onClick={onImageUpload}>
        <MdImage/>
        <span>업로드</span>
      </div>
      <div className={cn.writeHeader__right__button} onClick={upsertPost}>
        <MdSave/>
        <span>작성하기</span>
      </div>
    </div>
  </div>
);

export default WriteHeader;