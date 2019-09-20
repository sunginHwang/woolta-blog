import React, { useCallback, useEffect, useState } from 'react';
import { ICategory } from '../types/post/ICategory';
import { addElement } from '../core/utils/domUtil';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/redux/RootState';
import { setCategory, setContent, setTitle } from '../store/reducers/postWriteReducer';
import { toggleSpinnerLoading } from '../store/reducers/layoutReducer';
import * as FileApi from '../core/api/FileApi';
import { convertImageToCodeImage } from '../core/utils/imageUtil';
import PostWriteHeader from '../components/post/write/PostWriteHeader/PostWriteHeader';
import PostWriteForm from '../components/post/write/PostWriteForm/PostWriteForm';


const WriteEditorContainer: React.FC<{}> = ({}) => {
  const [contentWriteIndex, setContentWriteIndex] = useState<number>(0);

  const dispatch = useDispatch();
  const { authInfo, categories, postWriteReducer: { title, content, category } } = useSelector((state: RootState) => ({
    authInfo: state.authReducer.authInfo,
    postWriteReducer: state.postWriteReducer,
    categories: state.categoryReducer.categories,
  }));

  useEffect(() => {
    window && window.addEventListener('drop', onDnd); //dnd Event
    (document && document.body) && document.body.addEventListener('paste', onPaste);// paste Event
    return () => {
      window && window.removeEventListener('drop', onDnd);
      (document && document.body) && document.body.removeEventListener('paste', onPaste);
    };
  }, [content, contentWriteIndex]);

  const onPaste = async (e) => {
    const { items } = e.clipboardData || e.originalEvent.clipboardData;

    if (items.length !== 2) return;
    if (items[1].kind !== 'file') return;
    //  file paste event prevent
    e.preventDefault();

    const file = items[1].getAsFile();

    dispatch(toggleSpinnerLoading(true));
    const markdownImg = await uploadImage(file);

    addImage(markdownImg, contentWriteIndex);
    dispatch(toggleSpinnerLoading(false));
  };

  const onDnd = async (e) => {
    e.preventDefault();

    const { files } = e.dataTransfer;
    dispatch(toggleSpinnerLoading(true));
    const imagePromises = [];
    for (let i = 0; i < files.length; i++) {
      imagePromises.push(uploadImage(files[i]));
    }

    const images = await Promise.all(imagePromises);
    addImage(images.flat(), contentWriteIndex);
    dispatch(toggleSpinnerLoading(false));
  };

  // 이미지 업로드
  const uploadImage = async (file) => {
    const savedImageUrl = await FileApi.saveImageAndGetImageUrl(file);
    return convertImageToCodeImage(savedImageUrl);
  };

  /*이미지 버튼 삽입*/
  const onUploadImage = () => {
    const fileInput = addElement('input');
    fileInput.type = 'file';
    fileInput.onchange = async () => {
      if (!fileInput.files) return;
      dispatch(toggleSpinnerLoading(true));
      const markdownImg = await uploadImage(fileInput.files[0]);
      addImage(markdownImg, contentWriteIndex);
      dispatch(toggleSpinnerLoading(false));
    };
    fileInput.click();
  };

  const addImage = (image, addIndex) => dispatch(setContent(content.slice(0, addIndex) + image + content.slice(addIndex)));
  const onChangeCategories = useCallback((selectedCategory: ICategory) => dispatch(setCategory(selectedCategory)), [dispatch]);
  const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => dispatch(setTitle(e.target.value)), [dispatch]);

  const onChangeContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setContent(e.target.value));
    setContentWriteIndex(e.target.selectionStart);
  }, [content]);


  return (
    <>
      <PostWriteHeader userInfo={authInfo}/>
      <PostWriteForm category={category}
                     categories={categories}
                     title={title}
                     content={content}
                     onUploadImage={onUploadImage}
                     onChangeTitle={onChangeTitle}
                     onChangeContent={onChangeContent}
                     onChangeCategories={onChangeCategories}
                     onChangeContentIndex={setContentWriteIndex}
      />
    </>
  );
};

export default React.memo(WriteEditorContainer);
