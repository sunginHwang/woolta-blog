import React, { useEffect } from 'react';
import { MdAddToPhotos } from 'react-icons/md';
import Select from 'react-select';
// @ts-ignore
import cn from './WriteEditor.scss';
import { ICategory } from '../../../../types/post/ICategory';
import { IUserInfo } from '../../../../types/user/IUserInfo';

interface WriteEditorProps {
  content: string;
  title: string;
  categories: ICategory[];
  authInfo: IUserInfo;
  selectedCategory: string;
  onChangeContent: (content: string) => void;
  onChangeTitle: (title: string) => void;
  onClickUploadImage: any;
  uploadImage: any;
  onChangeCategories: any;

}

const WriteEditor: React.FC<WriteEditorProps> = ({
                                                   onChangeContent,
                                                   onChangeTitle,
                                                   content,
                                                   onClickUploadImage,
                                                   categories,
                                                   uploadImage,
                                                   onChangeCategories,
                                                   selectedCategory,
                                                   title,
                                                   authInfo,
                                                 }) => {

  useEffect(() => {
    createEventListener();
    return () => removeEventListener();
  }, []);

  const createEventListener = () => {
    if (window) window.addEventListener('drop', onDnd); //dnd Event
    if (document && document.body) document.body.addEventListener('paste', onPaste);// paste Event
  };

  const removeEventListener = () => {
    if (window) window.removeEventListener('drop', onDnd);
    if (document && document.body) document.body.removeEventListener('paste', onPaste);
  };

  const onPaste = async (e) => {
    const { items } = e.clipboardData || e.originalEvent.clipboardData;
    if (items.length !== 2) return;
    if (items[1].kind !== 'file') return;

    const file = items[1].getAsFile();

    const markdownImg = await uploadImage(file);
    addImage(markdownImg, e.target.selectionStart);
    e.preventDefault();
  };

  const onDnd = async (e) => {
    e.preventDefault();

    const { files } = e.dataTransfer;

    const imagePromises = [];
    for (let i = 0; i < files.length; i++) {
      imagePromises.push(uploadImage(files[i]));
    }

    const images = await Promise.all(imagePromises);
    addImage(images.flat(), e.target.selectionStart);
  };

  const addImage = (image, addIndex) => {
    onChangeContent(content.slice(0, addIndex) + image + content.slice(addIndex));
  };


  return (
    <div style={{ height: '100%' }}>
      <div className={cn.writeTopArea}>
        <img className={cn.author} src={authInfo.imageUrl}/>
        <span className={cn.authorName}>{`작성자 : ${authInfo.userId}`}</span>
      </div>
      <div className={cn.writeTopArea}>
        <Select
          value={selectedCategory}
          onChange={onChangeCategories}
          options={categories}/>
      </div>
      <div className={cn.writeTitleArea}>
        <input className={cn.writeTitle}
               type='text'
               placeholder='제목을 입력해 주세요.'
               onChange={(e) => onChangeTitle(e.target.value)}
               value={title}/>
        <div
          className={cn.imageInsertBtn}
          onClick={onClickUploadImage}><span><MdAddToPhotos/>이미지 업로드</span></div>
      </div>
      <textarea className={cn.markDownEditor}
                placeholder='작성할 내용을 입력해 주세요.'
                onChange={(e) => onChangeContent(e.target.value)}
                value={content}/>
    </div>

  );
};

export default WriteEditor;
