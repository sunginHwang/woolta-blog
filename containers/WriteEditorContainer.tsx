import React, { useEffect, useRef } from 'react';
import { ICategory } from '../types/post/ICategory';
import { IUserInfo } from '../types/user/IUserInfo';
import { addElement } from '../core/utils/domUtil';
import Select from 'react-select';
import cn from '../components/post/write/WriteEditor/WriteEditor.scss';
import { MdAddToPhotos } from 'react-icons/md';

interface WriteEditorContainerProps{
 content: string;
 title: string;
 categories: ICategory[];
 authInfo: IUserInfo;
 selectedCategory: string;
 onChangeContent: (content: string) => void;
 onChangeTitle: (title: string) => void;
 uploadImage: any;
 onChangeCategories: any;
}

const WriteEditorContainer: React.FC<WriteEditorContainerProps> = ({}) => {
 const contentRef = useRef(null);

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
  addImage(markdownImg, contentRef.current.selectionStart);
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
  addImage(images.flat(), contentRef.current.selectionStart);
 };

 /*이미지 버튼 삽입*/
 const onClickUploadImage = () => {
  const fileInput = addElement('input');
  fileInput.type = 'file';
  fileInput.onchange = async () => {
   if (!fileInput.files) return;
   const markdownImg = await uploadImage(fileInput.files[0]);
   addImage(markdownImg, contentRef.current.selectionStart);
  };
  fileInput.click();
 };

 const addImage = (image, addIndex) => {
  onChangeContent(content.slice(0, addIndex) + image + content.slice(addIndex));
 };

 return (
   <div className={cn.writeEditor}>
    <div className={cn.writeEditor__header}>
     <img className={cn.writeEditor__header__author} src={authInfo.imageUrl}/>
     <span className={cn.writeEditor__header__authorName}>{`작성자 : ${authInfo.userId}`}</span>
    </div>
    <div className={cn.writeEditor__selector}>
     <Select
       value={selectedCategory}
       onChange={onChangeCategories}
       options={categories}/>
    </div>
    <div className={cn.writeEditor__title}>
     <input type='text'
            placeholder='제목을 입력해 주세요.'
            onChange={(e) => onChangeTitle(e.target.value)}
            value={title}/>
     <div className={cn.writeEditor__title__imgInsertButton}
          onClick={onClickUploadImage}><span><MdAddToPhotos/>이미지 업로드</span></div>
    </div>
    <textarea className={cn.writeEditor__markDownEditor}
              ref={contentRef}
              placeholder='작성할 내용을 입력해 주세요.'
              onChange={(e) => onChangeContent(e.target.value)}
              value={content}/>
   </div>

 );
};

export default WriteEditorContainer;