import React from 'react';
import cn from './PostWriteTitle.scss';
import { MdAddToPhotos } from 'react-icons/md';
import { ICategory } from '../../../../types/post/ICategory';
import Select from 'react-select';

interface PostWriteFormProps {
  category: string;
  categories: ICategory[];
  title: string;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCategories: (selectedCategory: ICategory) => void;
  onUploadImage: () => void;

}

const PostWriteTitle: React.FC<PostWriteFormProps> = ({
                                                        title,
                                                        category,
                                                        categories,
                                                        onChangeTitle,
                                                        onUploadImage,
                                                        onChangeCategories,
                                                      }) => (
  <>
    <div className={cn.postWriteTitle__selector}>
      <Select
        value={category}
        onChange={onChangeCategories}
        options={categories}/>
    </div>
    <div className={cn.postWriteTitle__title}>
      <input type='text'
             value={title}
             placeholder='제목을 입력해 주세요.'
             onChange={onChangeTitle}
      />
      <div className={cn.postWriteTitle__title__imgInsertButton}
           onClick={onUploadImage}><span><MdAddToPhotos/>이미지 업로드</span></div>
    </div>
  </>
);

export default PostWriteTitle;