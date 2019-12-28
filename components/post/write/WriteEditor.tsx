import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MdAddToPhotos } from 'react-icons/md';
import Select from 'react-select';
import { ICategory } from '../../../types/post/ICategory';
import { IUserInfo } from '../../../types/user/IUserInfo';
import { addElement } from '../../../core/utils/domUtil';
import colors from '../../../style/colors';
import mixins from '../../../style/mixins';

type WriteEditorProps = {
  content: string;
  title: string;
  categories: ICategory[];
  userInfo: IUserInfo;
  selectedCategory: string;
  onChangeContent: (content: string) => void;
  onChangeTitle: (title: string) => void;
  uploadImage: any;
  onChangeCategories: any;
}

function WriteEditor({
                       onChangeContent,
                       onChangeTitle,
                       content,
                       categories,
                       uploadImage,
                       onChangeCategories,
                       selectedCategory,
                       title,
                       userInfo,
                     }: WriteEditorProps) {

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
    <S.WriteEditor>
      <S.WriteEditorHeader>
        <img src={userInfo.imageUrl} alt='writeEditorImg'/>
        <span>{`작성자 : ${userInfo.userId}`}</span>
      </S.WriteEditorHeader>
      <S.WriteEditorSelect>
        <Select
          value={selectedCategory}
          onChange={onChangeCategories}
          options={categories}/>
      </S.WriteEditorSelect>
      <S.WriteEditorTitle>
        <input type='text'
               placeholder='제목을 입력해 주세요.'
               onChange={(e) => onChangeTitle(e.target.value)}
               value={title}/>
        <div onClick={onClickUploadImage}><span><MdAddToPhotos/>이미지 업로드</span></div>
      </S.WriteEditorTitle>
      <textarea ref={contentRef}
                placeholder='작성할 내용을 입력해 주세요.'
                onChange={(e) => onChangeContent(e.target.value)}
                value={content}/>
    </S.WriteEditor>

  );
};

WriteEditor.defaultProps = {
  content: '',
  title: '',
  categories: [],
  userInfo: {
    no: 0,
    userId: '',
  },
};

export default WriteEditor;

const S: any = {};

S.WriteEditor = styled.div`
  height: 100%;
  
  textarea{
    width: 100%;
    display: inline-block;
    outline-style: none;
    height: 75%;
    font-size: 1.6rem;
    border: none;
    resize: none;
    overflow-y: scroll;
    -ms-overflow-style: none;
  }
`;

S.WriteEditorTitle = styled.div`
  display: flex;
  height: 6rem;
  margin-bottom: 2rem;
  align-items: center;
  justify-content: space-between;
  
  input{
    width: 75%;
    border: none;
    outline-style: none;
    font-size: 2.4rem;
  }
  
  div{
    width: 20%;
    float: right;
    ${mixins.mainButton}
  }
`;

S.WriteEditorHeader = styled.div`
  text-align: left;
  margin-bottom: 2rem;
  
  img{
    border-radius: 50%;
    margin-right: 1rem;
    width: 3rem;
    height: 3rem;
    vertical-align: middle;
  }
  
  span{
    color: ${colors.mainThemeColor};
    font-weight: bold;
  }
`;

S.WriteEditorSelect = styled.div`
  text-align: left;
  margin-bottom: 2rem;
`;
